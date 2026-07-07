# ============================================================
# UIBlocks - Production Dockerfile
# Multi-stage build with security and optimization best practices
# ============================================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install only production dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm ci --only=production --ignore-scripts

# Stage 2: Build
FROM node:20-alpine AS build
WORKDIR /app

# Build-time argument for Vite API base URL
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Build the frontend
RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3001

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies (cached layer)
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# Copy built frontend from build stage
COPY --from=build /app/dist ./dist

# Copy server code
COPY server ./server

# Set ownership to non-root user
RUN chown -R appuser:nodejs /app

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3001

# Health check to verify container is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Start the application
CMD ["node", "server/index.js"]