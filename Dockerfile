# Use the official Node.js runtime as a parent image
FROM node:19.6-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8080 for the application
EXPOSE 8080

# Start the application
CMD npm run docker
