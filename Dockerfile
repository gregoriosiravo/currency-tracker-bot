FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Copy .env for environment variables
COPY .env .env

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
