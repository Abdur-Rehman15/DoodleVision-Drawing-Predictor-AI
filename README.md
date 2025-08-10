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

### 🌐 Deployment (Dockerized)

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
│   ├── package.json           # Node.js dependencies
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   ├── index.html          # HTML template
│   ├── src/
│   │   ├── App.js              # Main React app component
│   │   ├── DrawingCanvas.js    # Canvas where user draws
│   │   ├── App.css             # App styles
│   │   └── DrawingCanvas.css   # Canvas styles
│   ├── package.json            # React app dependencies
│   └── Dockerfile
├── .dockerignore               # Docker build exclusions
├── README.md                   # You're reading it
 └── .gitignore                  # Files to ignore in Git
```

---

