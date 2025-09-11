# Use official Node.js image
FROM node:18
# Set working directory
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy source code
COPY . .
# Expose port and start server
EXPOSE 3001
CMD ["npm", "start"]
