#!/bin/bash
# ============================================================
# UIBlocks - AWS EC2 Setup Script
# Run this script ONCE on a fresh Ubuntu EC2 instance
# ============================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo ""
echo "============================================"
echo "  UIBlocks - EC2 Setup"
echo "============================================"
echo ""

# ============================================================
# 1. System Updates
# ============================================================
log_info "Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y
log_success "System packages updated"

# ============================================================
# 2. Install Docker
# ============================================================
log_info "Installing Docker..."
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
log_success "Docker installed"

# ============================================================
# 3. Add ubuntu user to docker group
# ============================================================
log_info "Adding ubuntu user to docker group..."
sudo usermod -aG docker ubuntu
log_success "User added to docker group"

# ============================================================
# 4. Enable Docker to start on boot
# ============================================================
log_info "Enabling Docker to start on boot..."
sudo systemctl enable docker
sudo systemctl start docker
log_success "Docker enabled on boot"

# ============================================================
# 5. Install Nginx
# ============================================================
log_info "Installing Nginx..."
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
log_success "Nginx installed and running"

# ============================================================
# 6. Install Certbot (Let's Encrypt)
# ============================================================
log_info "Installing Certbot for SSL..."
sudo apt-get install -y certbot python3-certbot-nginx
log_success "Certbot installed"

# ============================================================
# 7. Create application directory
# ============================================================
log_info "Creating application directory..."
mkdir -p /home/ubuntu/uiblocks
mkdir -p /home/ubuntu/uiblocks/logs
log_success "Application directory created at /home/ubuntu/uiblocks"

# ============================================================
# 8. Create .env template
# ============================================================
log_info "Creating .env template..."
if [ ! -f /home/ubuntu/uiblocks/.env ]; then
    cat > /home/ubuntu/uiblocks/.env << 'EOF'
# UIBlocks Environment Variables
# Set these values from GitHub Secrets
DATABASE_URL=postgresql://user:password@host:5432/db
PORT=3001
VITE_API_BASE_URL=http://localhost:3001
NODE_ENV=production
EOF
    log_warning "Please update /home/ubuntu/uiblocks/.env with actual values"
else
    log_info ".env file already exists, skipping"
fi

# ============================================================
# 9. Configure firewall (UFW)
# ============================================================
log_info "Configuring firewall..."
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable
log_success "Firewall configured"

# ============================================================
# 10. Configure Nginx
# ============================================================
log_info "Setting up Nginx configuration..."
sudo cp /home/ubuntu/uiblocks/nginx.conf /etc/nginx/sites-available/uiblocks 2>/dev/null || \
    log_warning "nginx.conf not found. Copy it manually after deployment."
sudo ln -sf /etc/nginx/sites-available/uiblocks /etc/nginx/sites-enabled/ 2>/dev/null || true
sudo nginx -t && sudo systemctl reload nginx
log_success "Nginx configured"

# ============================================================
# 11. Verify installations
# ============================================================
echo ""
log_info "Verifying installations..."
echo ""

echo "Docker version: $(docker --version)"
echo "Docker Compose: $(docker compose version 2>/dev/null || echo 'not found')"
echo "Nginx version: $(nginx -v 2>&1 | grep -oP 'nginx/\K[0-9.]+')"
echo "Certbot version: $(certbot --version 2>&1)"
echo ""

# ============================================================
# 12. Summary
# ============================================================
echo ""
echo "============================================"
echo "  EC2 Setup Complete!"
echo "============================================"
echo ""
echo "  Next steps:"
echo "  1. Update /home/ubuntu/uiblocks/.env with your secrets"
echo "  2. Copy nginx.conf to /etc/nginx/sites-available/uiblocks"
echo "  3. Set up SSL: sudo certbot --nginx -d your-domain.com"
echo "  4. Push to main to trigger deployment"
echo ""
echo "  Application directory: /home/ubuntu/uiblocks"
echo "  Logs directory:        /home/ubuntu/uiblocks/logs"
echo "  Nginx config:          /etc/nginx/sites-available/uiblocks"
echo ""