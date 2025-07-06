FROM node:18

# Set working directory
WORKDIR /app

# --- Node setup ---
COPY backend/package*.json ./
RUN npm install

# --- Python & system dependencies ---
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential

# Create and activate virtualenv
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# --- Python setup ---
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy remaining backend files
COPY backend/ .

# Expose backend port
EXPOSE 5000

CMD ["node", "server.js"]
