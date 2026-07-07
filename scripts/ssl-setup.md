# UIBlocks SSL Setup Guide (Let's Encrypt)

This guide walks you through securing your UIBlocks EC2 deployment with HTTPS using Let's Encrypt and Certbot.

## Prerequisites

- Ubuntu EC2 instance with Nginx installed
- A registered domain name pointing to your EC2 instance's public IP
- Ports 80 and 443 open in your security group and firewall

## Step 1: Configure DNS

Create an **A record** in your DNS provider pointing to your EC2 instance IP:

| Type | Name | Value |
|------|------|-------|
| A    | @    | `<YOUR_EC2_PUBLIC_IP>` |
| A    | www  | `<YOUR_EC2_PUBLIC_IP>` |

Wait for DNS propagation (can take 5 minutes to 24 hours).

## Step 2: Install Certbot

```bash
# Install Certbot with Nginx plugin (if not already installed)
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Verify installation
certbot --version
```

## Step 3: Obtain SSL Certificate

Run Certbot in Nginx mode:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Replace `your-domain.com` with your actual domain.

### What this does:

1. Certbot contacts Let's Encrypt to verify domain ownership
2. It temporarily modifies your Nginx config to serve a challenge file
3. Let's Encrypt validates the challenge and issues a certificate
4. Certbot automatically updates your Nginx configuration with SSL directives
5. The certificate is stored at:
   - `/etc/letsencrypt/live/your-domain.com/fullchain.pem`
   - `/etc/letsencrypt/live/your-domain.com/privkey.pem`

## Step 4: Update Nginx Configuration

After running Certbot, your existing Nginx config at `/etc/nginx/sites-available/uiblocks` will be modified. The SSL certificate paths will be automatically inserted.

If you need to manually configure SSL, update the `ssl_certificate` and `ssl_certificate_key` paths in your nginx.conf:

```nginx
ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
```

Replace `your-domain.com` with your actual domain in the config file.

Then test and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Step 5: Verify SSL

### Online tools:
- [SSL Labs Test](https://www.ssllabs.com/ssltest/) — comprehensive SSL analysis
- [Let's Debug](https://letsdebug.net/) — Let's Encrypt issue diagnosis

### Command line:
```bash
# Check certificate details
openssl s_client -connect your-domain.com:443 -servername your-domain.com

# Check HTTP→HTTPS redirect
curl -I http://your-domain.com
# Expected: 301 Moved Permanently → https://
```

## Step 6: Auto-Renewal

Let's Encrypt certificates expire after **90 days**. Certbot installs a systemd timer by default for automatic renewal.

### Check renewal timer status:
```bash
sudo systemctl status certbot.timer
```

### Test renewal process (dry run):
```bash
sudo certbot renew --dry-run
```

### Manual renewal (if needed):
```bash
sudo certbot renew
sudo systemctl reload nginx
```

## Step 7: Post-SSL Updates

### Update VITE_API_BASE_URL

After SSL is set up, update the VITE_API_BASE_URL in GitHub Secrets and `.env`:

```
VITE_API_BASE_URL=https://your-domain.com
```

### Update Docker health check

If you want the health check to go through Nginx (port 443), update the deploy script to check:
```
https://your-domain.com/api/health
```

## Troubleshooting

### Certificate not found
```bash
# Verify certificates exist
sudo ls -la /etc/letsencrypt/live/your-domain.com/

# Re-run Certbot
sudo certbot --nginx -d your-domain.com
```

### Auto-renewal not working
```bash
# Check timer logs
sudo journalctl -u certbot.timer

# Force renewal
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### Port 80 already in use
If Nginx is not running on port 80:
```bash
# Check what's using port 80
sudo lsof -i :80

# Ensure Nginx owns it
sudo systemctl restart nginx
```

## Security Recommendations

1. **Enable HSTS** after confirming SSL works:
   ```nginx
   add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
   ```

2. **Set up firewall** (already done in ec2-setup.sh):
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

3. **Regularly check certificate expiry**:
   ```bash
   # Add to crontab for weekly checks
   sudo crontab -e
   # Add: 0 0 * * 0 /usr/bin/certbot renew --quiet && systemctl reload nginx