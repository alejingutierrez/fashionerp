# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/package.json

# Install all dependencies for the frontend package
RUN pnpm install --frozen-lockfile=false --prod=false --filter ./frontend...

# Copy the rest of the frontend application
COPY frontend ./frontend

# Build the application
WORKDIR /app/frontend
RUN mv public/index.html .
RUN pnpm run build

# Stage 2: Serve the application
FROM nginx:1.27-alpine AS production

# Copy nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
