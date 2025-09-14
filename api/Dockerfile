# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /usr/src/frontend

# Copy frontend package files and install dependencies
COPY web/package*.json ./
RUN npm install

# Copy frontend source and build
COPY web/ ./
RUN npm run build

# Stage 2: Build API container
FROM node:20-alpine
WORKDIR /usr/src/app

# Install backend dependencies
COPY api/package*.json ./
RUN npm install --production

# Copy backend source code
COPY api/ ./

# Copy built frontend from stage 1
COPY --from=frontend-build /usr/src/frontend/dist ./web/dist

# Expose port
EXPOSE 4000

# Start server
CMD ["npm", "run", "start"]
