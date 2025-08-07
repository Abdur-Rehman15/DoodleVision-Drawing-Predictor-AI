# 🎨 DoodleVision – AI Drawing Predictor

**DoodleVision** is a web application that lets users draw on a canvas and receive real-time AI predictions about what they've drawn. It uses a machine learning model trained on 5 doodles (Apple, Bucket, Crown, Butterfly, Ladder) to classify the user's sketch and returns a prediction with confidence.

🔗 **Live Demo:** [DoodleVision](https://doodlevision-drawing-predictor-ai-ilhm.onrender.com/)

---

## 🚀 Features

- Interactive drawing canvas with brush tools (mouse + touch support)
- AI-powered predictions using a **Convolutional Neural Network (CNN)**
- Displays top prediction with confidence percentage
- Celebration confetti on high-confidence predictions
- Keeps recent doodles history
- Toggle between dark and light theme

---

## 🛠️ Tech Stack

| Frontend       | Backend              | Machine Learning     |
|----------------|----------------------|-----------------------|
| React          | Node.js + Express    | TensorFlow + Keras   |
| HTML/CSS       | Python 3             | CNN Classifier       |
| Canvas API     | CORS                 | Pillow, NumPy, Joblib |

---

## ⚙️ Installation

### 1. Clone the Repository

```
git clone https://github.com/Abdur-Rehman15/DoodleVision-Drawing-Predictor-AI.git
cd doodlevision-drawing-predictor-ai
```

### 2. Backend Setup

```
cd backend
npm install                
pip install -r requirements.txt  
```

### 3. Start Frontend

```
cd ../frontend
npm install
npm start
```
### 4. Start Backend Server

```
cd ../backend
node server.js
```

--- 

### 🧠 Model Details

- 📚 **Dataset:** Google QuickDraw `.npy` files (Apple, Bucket, Crown, Butterfly, Ladder)
  
- 🖼️ **Preprocessing:**
  - Grayscale conversion
  - Resize to 64x64
  - Flatten to 1D vector
      
- 📉 **Model:**
  - CNN with two Conv2D layers, pooling, dropout and dense layers
      
- 🤖 **Output:**
  - `.keras` Keras model (`final_cnn_model.keras`)

 ---

### 🌐 Deployment

#### Single Container Deployment (Recommended)

The project now uses a single Docker container that combines both frontend and backend:

```bash
# Quick deployment (includes fallback options)
chmod +x deploy.sh
./deploy.sh

# Or manually
docker build -t doodlevision-ai .
docker run -d --name doodlevision-ai -p 80:80 --restart unless-stopped doodlevision-ai

# If SSL issues occur, try alternative build
docker build -f Dockerfile.alternative -t doodlevision-ai .
```

#### Docker Compose (Alternative)

```bash
docker-compose up -d
```

#### Manual Setup (Development)

- 🔧 **Backend (Node.js + Python ML):**
  - Hosted on Render
  - CORS configured to allow frontend domain

- 🎨 **Frontend (React):**
  - Hosted separately on Render
  - Connects to backend API using fetch

 ---

## 📁 Project Structure

```
DoodleVision-Drawing-Predictor-AI/
├── backend/
│   ├── server.js               # Express server to handle /predict route
│   ├── predictor.py            # Python script to run the ML model
│   ├── final_cnn_model.keras   # Trained CNN model
│   ├── requirements.txt        # Python dependencies
│   └── package.json           # Node.js dependencies
│
├── frontend/
│   ├── public/
│   │   ├── index.html          # HTML template
│   ├── src/
│   │   ├── App.js              # Main React app component
│   │   ├── DrawingCanvas.js    # Canvas where user draws
│   │   ├── App.css             # App styles
│   │   └── DrawingCanvas.css   # Canvas styles
│   └── package.json            # React app dependencies
│
├── Dockerfile                  # Single container for both frontend & backend
├── Dockerfile.alternative      # Alternative build (if SSL issues occur)
├── nginx.conf                  # Nginx configuration for serving frontend & proxying API
├── supervisord.conf            # Process manager for nginx & backend
├── docker-compose.yml          # Docker Compose configuration
├── deploy.sh                   # Quick deployment script
├── .dockerignore               # Docker build exclusions
├── README.md                   # You're reading it
 └── .gitignore                  # Files to ignore in Git
```

---

## 🔧 Troubleshooting

### SSL/Network Issues During Build

If you encounter SSL errors during the Docker build (like the one you experienced), try these solutions:

1. **Use the alternative Dockerfile:**
   ```bash
   docker build -f Dockerfile.alternative -t doodlevision-ai .
   ```

2. **Use the deploy script (includes automatic fallback):**
   ```bash
   ./deploy.sh
   ```

3. **Manual retry with different pip options:**
   ```bash
   # Clear Docker cache first
   docker system prune -a
   
   # Then try building again
   docker build -t doodlevision-ai .
   ```

### Common Issues

- **Port 80 already in use:** Change the port mapping to `-p 8080:80`
- **Memory issues:** Ensure you have at least 4GB RAM available
- **Slow downloads:** The build downloads ~650MB of ML libraries, be patient

### Logs and Debugging

```bash
# Check container logs
docker logs doodlevision-ai

# Check specific service logs
docker exec doodlevision-ai tail -f /var/log/supervisor/backend.out.log
docker exec doodlevision-ai tail -f /var/log/supervisor/nginx.out.log

# Access container shell
docker exec -it doodlevision-ai bash
``` 
