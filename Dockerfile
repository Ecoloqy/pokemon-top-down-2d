# Stage 1
FROM node:16.18-alpine as build

WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install

# Stage 2
FROM nginx:1.22.0-alpine as deploy

COPY nginx.conf /etc/nginx/nginx.conf
COPY src/* /usr/share/nginx/html
