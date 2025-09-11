# 🏗️ Build stage
FROM node:22.2.0 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 🚀 Serve stage
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]