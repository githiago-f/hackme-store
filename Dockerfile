# Use the official Node.js runtime as a parent image
FROM node:19.6-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

RUN npm run migrate
RUN npm run seed

# Expose port 3000 for the application
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
