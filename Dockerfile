# Stage 1: Build the React Vite App
FROM node:18-alpine AS build

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package*.json ./

RUN pnpm install

# Copy all the source files and build the app
COPY . .

RUN pnpm run build

# Stage 2: Serve with Node.js Static Server
FROM node:18-alpine

WORKDIR /app

# Install serve (lightweight static file server)
RUN npm install -g serve

# Copy build output from Stage 1
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]
