# ──────────────────────────────
# Stage 1 ─ Build de la aplicación
# ──────────────────────────────
FROM node:20-alpine AS builder

# Carpeta de trabajo
WORKDIR /app

# Instalar PNPM globalmente
RUN npm install -g pnpm

# 1 · Copiar manifests del workspace (monorepo) y el package del frontend
#    Esto permite a PNPM resolver workspaces y, a la vez, maximiza la caché Docker.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json

# 2 · Instalar dependencias **solo** para el paquete frontend
RUN pnpm install --frozen-lockfile=false --prod=false --filter ./frontend...

# 3 · Copiar el resto del código fuente del frontend
COPY frontend ./frontend

# 4 · Build de React
WORKDIR /app/frontend
RUN mv public/index.html .   # Elimínalo si tu build ya no lo necesita
RUN pnpm run build

# ──────────────────────────────
# Stage 2 ─ Servir la aplicación
# ──────────────────────────────
FROM nginx:1.27-alpine AS production

# Configuración de Nginx
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Archivos estáticos generados en el build
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
