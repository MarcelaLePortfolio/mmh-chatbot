# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install -g pnpm
RUN npm install --legacy-peer-deps

# Copy the rest of your app
COPY . .

# Expose the Next.js dev port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
