#!/bin/bash
# ============================================================
# UIBlocks - EC2 Deployment Script
# Pulls latest Docker image, stops old container, runs new one
# Includes zero-downtime strategy and rollback support
# ============================================================

set -euo pipefail

# ============================================================
# Configuration
# ============================================================
APP_NAME="uiblocks"
DOCKER_IMAGE="${DOCKER_USERNAME:-sujay149}/uiblocks"
CONTAINER_NAME="uiblocks"
CONTAINER_NAME_NEW="uiblocks-new"
APP_PORT="${APP_PORT:-3001}"
APP_DIR="/home/ubuntu/uiblocks"
ENV_FILE="${APP_DIR}/.env"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="${APP_DIR}/deploy-${TIMESTAMP}.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================
# Logging Functions
# ============================================================
log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# ============================================================
# Pre-flight Checks
# ============================================================
preflight_checks() {
    log_info "Running pre-flight checks..."

    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running. Please start Docker first."
        exit 1
    fi

    # Check if logged into Docker Hub
    if ! docker system info | grep -q "Username"; then
        log_warning "Not logged into Docker Hub. Attempting login..."
        if [ -n "${DOCKER_USERNAME:-}" ] && [ -n "${DOCKER_PASSWORD:-}" ]; then
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
        else
            log_error "DOCKER_USERNAME and DOCKER_PASSWORD not set. Cannot login to Docker Hub."
            exit 1
        fi
    fi

    # Check if env file exists
    if [ ! -f "$ENV_FILE" ]; then
        log_warning "Environment file not found at ${ENV_FILE}"
        log_info "Creating placeholder env file..."
        cat > "$ENV_FILE" << 'EOF'
# UIBlocks Environment Variables
# Copy from GitHub Secrets or your local .env
DATABASE_URL=
PORT=3001
VITE_API_BASE_URL=
NODE_ENV=production
EOF
        log_warning "Please populate ${ENV_FILE} with actual values before deployment"
    fi

    # Ensure app directory exists
    mkdir -p "$APP_DIR"

    log_success "Pre-flight checks passed"
}

# ============================================================
# Pull Latest Image
# ============================================================
pull_image() {
    log_info "Pulling latest Docker image: ${DOCKER_IMAGE}:latest"

    if docker pull "${DOCKER_IMAGE}:latest"; then
        log_success "Successfully pulled ${DOCKER_IMAGE}:latest"
    else
        log_error "Failed to pull Docker image: ${DOCKER_IMAGE}:latest"
        exit 1
    fi
}

# ============================================================
# Zero-Downtime Deployment
# ============================================================
deploy_container() {
    log_info "Starting zero-downtime deployment..."

    # Step 1: Start new container alongside old one
    log_info "Starting new container: ${CONTAINER_NAME_NEW}"
    
    if docker container inspect "${CONTAINER_NAME}" &> /dev/null; then
        log_info "Existing container found. Starting new container alongside..."
        
        # Get existing container's network settings
        docker run -d \
            --name "${CONTAINER_NAME_NEW}" \
            --restart unless-stopped \
            -p 3001:3001 \
            --env-file "$ENV_FILE" \
            --label "deploy-timestamp=${TIMESTAMP}" \
            "${DOCKER_IMAGE}:latest"
    else
        log_info "No existing container. Starting fresh..."
        
        docker run -d \
            --name "${CONTAINER_NAME}" \
            --restart unless-stopped \
            -p 3001:3001 \
            --env-file "$ENV_FILE" \
            --label "deploy-timestamp=${TIMESTAMP}" \
            "${DOCKER_IMAGE}:latest"
        
        log_success "Container started successfully"
        return 0
    fi

    # Step 2: Wait for new container to be healthy
    log_info "Waiting for new container to be healthy..."
    sleep 5
    
    MAX_RETRIES=12
    RETRY_COUNT=0
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        RETRY_COUNT=$((RETRY_COUNT + 1))
        
        # Check container status
        CONTAINER_STATUS=$(docker inspect --format='{{.State.Status}}' "${CONTAINER_NAME_NEW}" 2>/dev/null || echo "not_found")
        
        if [ "$CONTAINER_STATUS" != "running" ]; then
            log_warning "New container status: ${CONTAINER_STATUS} (attempt ${RETRY_COUNT}/${MAX_RETRIES})"
            sleep 5
            continue
        fi
        
        # Check health endpoint
        HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
            --connect-timeout 5 \
            --max-time 10 \
            http://localhost:3001/api/health 2>/dev/null || echo "000")
        
        if [ "$HTTP_RESPONSE" = "200" ]; then
            log_success "New container is healthy! (HTTP ${HTTP_RESPONSE})"
            
            # Step 3: Stop and remove old container
            log_info "Stopping old container: ${CONTAINER_NAME}"
            docker stop "${CONTAINER_NAME}" 2>/dev/null || true
            
            log_info "Removing old container: ${CONTAINER_NAME}"
            docker rm "${CONTAINER_NAME}" 2>/dev/null || true
            
            # Step 4: Rename new container to production name
            log_info "Renaming new container to: ${CONTAINER_NAME}"
            docker rename "${CONTAINER_NAME_NEW}" "${CONTAINER_NAME}"
            
            log_success "Zero-downtime deployment completed successfully"
            return 0
        else
            log_warning "Health check attempt ${RETRY_COUNT}/${MAX_RETRIES} - HTTP ${HTTP_RESPONSE}"
            sleep 5
        fi
    done
    
    # If we get here, deployment failed
    log_error "New container failed health checks after ${MAX_RETRIES} attempts"
    
    # Step 5: Rollback - stop and remove new container
    log_warning "Initiating rollback..."
    docker stop "${CONTAINER_NAME_NEW}" 2>/dev/null || true
    docker rm "${CONTAINER_NAME_NEW}" 2>/dev/null || true
    
    # If old container exists, ensure it's running
    if docker container inspect "${CONTAINER_NAME}" &> /dev/null; then
        OLD_STATUS=$(docker inspect --format='{{.State.Status}}' "${CONTAINER_NAME}")
        if [ "$OLD_STATUS" != "running" ]; then
            log_warning "Old container is not running. Attempting to restart..."
            docker start "${CONTAINER_NAME}" 2>/dev/null || true
        fi
        log_success "Rolled back to previous container: ${CONTAINER_NAME}"
    else
        log_error "No previous container to rollback to. Application is down."
        exit 1
    fi
    
    exit 1
}

# ============================================================
# Cleanup
# ============================================================
cleanup() {
    log_info "Running cleanup..."
    
    # Remove dangling images
    DANGLING=$(docker images -f "dangling=true" -q)
    if [ -n "$DANGLING" ]; then
        log_info "Removing dangling images..."
        docker rmi $DANGLING 2>/dev/null || true
    fi
    
    # Remove old images (keep last 3)
    log_info "Cleaning up old images..."
    IMAGES_TO_KEEP=3
    IMAGE_LIST=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep "${DOCKER_IMAGE}" | sort -r | tail -n +$((IMAGES_TO_KEEP + 1)))
    
    for IMAGE in $IMAGE_LIST; do
        if [ "$IMAGE" != "${DOCKER_IMAGE}:latest" ]; then
            log_info "Removing old image: ${IMAGE}"
            docker rmi "$IMAGE" 2>/dev/null || true
        fi
    done
    
    log_success "Cleanup completed"
}

# ============================================================
# Verify Deployment
# ============================================================
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check container is running
    CONTAINER_STATUS=$(docker inspect --format='{{.State.Status}}' "${CONTAINER_NAME}" 2>/dev/null || echo "not_found")
    
    if [ "$CONTAINER_STATUS" != "running" ]; then
        log_error "Container ${CONTAINER_NAME} is not running (status: ${CONTAINER_STATUS})"
        exit 1
    fi
    
    # Check health endpoint
    HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
        --connect-timeout 5 \
        --max-time 10 \
        http://localhost:3001/api/health 2>/dev/null || echo "000")
    
    if [ "$HTTP_RESPONSE" = "200" ]; then
        HEALTH_DATA=$(curl -s --max-time 5 http://localhost:3001/api/health 2>/dev/null)
        log_success "Deployment verified - Health endpoint returned HTTP ${HTTP_RESPONSE}"
        log_info "Health data: ${HEALTH_DATA}"
    else
        log_error "Health check failed with HTTP ${HTTP_RESPONSE}"
        exit 1
    fi
    
    # Show container info
    log_info "Container details:"
    docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.CreatedAt}}" | tee -a "$LOG_FILE"
}

# ============================================================
# Main
# ============================================================
main() {
    echo ""
    echo "============================================"
    echo "  UIBlocks Deployment Script"
    echo "============================================"
    echo ""

    preflight_checks
    pull_image
    deploy_container
    cleanup
    verify_deployment

    echo ""
    echo "============================================"
    echo "  Deployment Complete!"
    echo "============================================"
    echo ""
    log_success "Application is running at http://localhost:${APP_PORT}"
    log_success "Health endpoint: http://localhost:${APP_PORT}/api/health"
    echo ""
}

main "$@"