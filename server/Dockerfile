# OS image
FROM node:16

# Create app directory
WORKDIR /app

# Copy app source
COPY . .

# Install app dependencies
RUN npm install

# Build app
RUN npm run build:docker

# Expose port
EXPOSE 8080

# Start app
CMD [ "npm", "run", "start:docker" ]