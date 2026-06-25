# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Stage 1: Build
# -----------------------------------------------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Compilar deasync (dependencia nativa de aspnet-identity-pw)
RUN apk add --no-cache python3 make g++

ENV PYTHON=/usr/bin/python3

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias (incluyendo devDependencies para build)
RUN npm ci --legacy-peer-deps

# Copiar código fuente
COPY . .

# Construir la aplicación NestJS
RUN npm run build

# Eliminar devDependencies para reducir tamaño
RUN npm prune --production --legacy-peer-deps

# -----------------------------------------------------------------------------
# Stage 2: Production
# -----------------------------------------------------------------------------
FROM node:24-alpine AS production

WORKDIR /app

# Instalar wget para HEALTHCHECK en Alpine
RUN apk add --no-cache wget

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Copiar archivos necesarios desde builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=5030

# Exponer puerto
EXPOSE 5030

# Cambiar a usuario no-root
USER nestjs

# Healthcheck para Dokploy (usa $PORT para coincidir con la config del dominio)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD sh -c 'wget --no-verbose --tries=1 --spider "http://127.0.0.1:${PORT}/health" || exit 1'

# Comando de inicio
CMD ["node", "dist/main.js"]
