# Use Node.js LTS image
FROM node:20

# Set working directory in container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy backend code
COPY . .

# Cloud Run expects PORT=8080
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
