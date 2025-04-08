# Step 1: Use an official Node.js image as the base image
FROM node:18-slim AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy only package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Step 4: Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Build the React app with Vite
RUN pnpm run build

# Step 7: Use a smaller Node.js image for serving the app
FROM node:18-slim

# Step 8: Set the working directory
WORKDIR /app

# Step 9: Copy the built app from the previous stage
COPY --from=build /app/dist /app/dist

# Step 10: Expose the port the app will run on
EXPOSE 3000

# Step 11: Install serve, which is built into Vite for serving the built app
RUN npm install -g serve

# Step 12: Use the 'serve' command to serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]
