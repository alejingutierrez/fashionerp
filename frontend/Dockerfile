# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files first (for better layer caching)
COPY frontend/package.json ./
COPY frontend/pnpm-lock.yaml* ./

# Install all dependencies including dev dependencies
RUN pnpm install --frozen-lockfile=false --prod=false

# Copy the rest of the application
COPY frontend/ .

# Move index.html to the root directory for Vite
RUN mv public/index.html .

# Build the application
RUN pnpm run build

# Stage 2: Serve the application
FROM nginx:1.27-alpine AS production

# Copy nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
