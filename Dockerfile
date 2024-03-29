# Use Node.js 16.x.x LTS as the base image
FROM node:16

# Log Node.js version
RUN node --version

# Log npm version
RUN npm --version

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

# Remove existing node_modules (if any) and install dependencies
RUN rm -rf node_modules
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (adjust as needed)
EXPOSE 40000

# Set environment variables
ENV NODE_ENV=production

# Command to run your application
CMD ["node", "server.js"]
