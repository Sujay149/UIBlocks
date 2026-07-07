#!/bin/bash
# ============================================================
# UIBlocks - Rollback Script
# Rolls back to the previous Docker image if deployment fails
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
LOG_FILE="${APP_DIR}/rollback-${TIMESTAMP}.log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"; }
log_error() { echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"; }

rollback() {
    echo ""
    echo "============================================"
    echo "  UIBlocks Rollback Script"
    echo "============================================"
    echo ""

    log_info "Starting rollback procedure..."

    # Check if the new container exists and remove it
    if docker container inspect "${CONTAINER_NAME_NEW}" &> /dev/null; then
        log_info "Stopping and removing failed container: ${CONTAINER_NAME_NEW}"
        docker stop "${CONTAINER_NAME_NEW}" 2>/dev/null || true
        docker rm "${CONTAINER_NAME_NEW}" 2>/dev/null || true
        log_success "Removed failed container"
    else
        log_info "No new container found to remove"
    fi

    # Check if the old container exists
    if docker container inspect "${CONTAINER_NAME}" &> /dev/null; then
        OLD_STATUS=$(docker inspect --format='{{.State.Status}}' "${CONTAINER_NAME}")
        log_info "Previous container status: ${OLD_STATUS}"
        
        if [ "$OLD_STATUS" != "running" ]; then
            log_warning "Previous container is not running. Attempting to restart..."
            docker start "${CONTAINER_NAME}" 2>/dev/null || true
            sleep 3
            
            # Verify it started
            NEW_STATUS=$(docker inspect --format='{{.State.Status}}' "${CONTAINER_NAME}" 2>/dev/null || echo "not_found")
            if [ "$NEW_STATUS" = "running" ]; then
                log_success "Previous container restarted successfully"
            else
                log_error "Failed to restart previous container (status: ${NEW_STATUS})"
                exit 1
            fi
        else
            log_success "Previous container is still running: ${CONTAINER_NAME}"
        fi
        
        # Verify health
        log_info "Verifying previous container health..."
        HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
            --connect-timeout 5 \
            --max-time 10 \
            http://localhost:${APP_PORT}/api/health 2>/dev/null || echo "000")
        
        if [ "$HTTP_RESPONSE" = "200" ]; then
            log_success "Previous container is healthy (HTTP ${HTTP_RESPONSE})"
        else
            log_warning "Previous container health check returned HTTP ${HTTP_RESPONSE}"
        fi
    else
        log_error "No previous container found to rollback to"
        log_error "Application may be down. Please investigate manually."
        exit 1
    fi

    # Cleanup dangling images
    log_info "Cleaning up dangling images..."
    DANGLING=$(docker images -f "dangling=true" -q)
    if [ -n "$DANGLING" ]; then
        docker rmi $DANGLING 2>/dev/null || true
    fi

    echo ""
    echo "============================================"
    echo "  Rollback Complete!"
    echo "============================================"
    echo ""
    log_success "Application rolled back to previous version"
    log_success "Container: ${CONTAINER_NAME}"
    log_success "Endpoint: http://localhost:${APP_PORT}"
    echo ""
}

rollback "$@"