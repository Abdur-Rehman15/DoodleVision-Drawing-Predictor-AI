FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./
RUN npm install

COPY backend/ .

# Install Python and dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Expose backend port
EXPOSE 5000

CMD ["node", "server.js"]
