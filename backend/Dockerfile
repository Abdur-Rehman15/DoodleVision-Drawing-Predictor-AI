# Use official Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# --- Node.js setup ---
COPY backend/package*.json ./
RUN npm install

# --- System and Python setup ---
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential

# Create and activate virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Upgrade pip inside virtualenv
RUN pip install --upgrade pip

# Copy requirements and install Python packages
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files
COPY backend/ .

# Expose backend port
EXPOSE 5000

# Start Node.js server
CMD ["node", "server.js"]
