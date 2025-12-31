# =========================
# Stage 1: Build React app
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build


# =========================
# Stage 2: Serve with Nginx
# =========================
FROM nginx:alpine

# Cloud Run injects PORT at runtime
ENV PORT=8080

# Nginx template (required for env substitution)
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

# Fix permissions (nginx runs as non-root)
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080

# Official nginx entrypoint handles envsubst automatically
CMD ["nginx", "-g", "daemon off;"]
