# 🎨 DoodleVision – AI Drawing Predictor

**DoodleVision** is a web application that lets users draw on a canvas and receive real-time AI predictions about what they've drawn. It uses a machine learning model trained on 5 doodles (Apple, Bucket, Crown, Butterfly, Ladder) to classify the user's sketch and return a prediction with confidence.

🔗 **Live Demo:** [DoodleVision](https://doodlevision-drawing-predictor-ai-rzlj.onrender.com)

---

## 🚀 Features

- Interactive drawing canvas with brush tools
- AI-powered predictions using an SVM classifier
- Displays top prediction with confidence percentage
- Celebration confetti on high-confidence predictions
- Keeps recent doodles history
- Toggle between dark and light theme

---

## 🛠️ Tech Stack

| Frontend | Backend | Machine Learning |
|---------|---------|------------------|
| React   | Node.js + Express | Scikit-learn (SVM, PCA) |
| HTML/CSS | Python 3 | Joblib, Pillow, NumPy |
| Canvas API | CORS | Custom-trained doodle classifier |

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abdur-Rehman15/DoodleVision-Drawing-Predictor-AI.git
cd DoodleVision-Drawing-Predictor-AI
```

### 2. Backend Setup

```
cd backend
npm install                
pip install -r requirements.txt  
```

### 3. Frontend Setup

```
cd ../frontend
npm install
npm start
```
### 4. Start Backend Server

```
cd ../backend
node server.js            # Starts backend server on http://localhost:5000
```

--- 

### 🧠 Model Details

- 📚 **Dataset:** Google QuickDraw `.npy` files (Apple, Bucket, Crown, Butterfly, Ladder)
  
- 🖼️ **Preprocessing:**
  - Grayscale conversion
  - Resize to 64x64
  - Flatten to 1D vector
      
- 📉 **PCA:**
  - Used to reduce dimensionality before classification
      
- 🤖 **Classifier:**
  - Trained SVM (Support Vector Machine) using scikit-learn
      
- 💾 Saved using `joblib`:
  - `model.pkl` – Trained SVM model
  - `scaler.pkl` – StandardScaler used before PCA
  - `pca.pkl` – PCA object to transform input

 ---

### 🌐 Deployment

This project is deployed using Render for both frontend and backend:

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
│   ├── model.pkl               # Trained SVM model (saved using joblib)
│   ├── scaler.pkl              # Scaler used to normalize input
│   ├── pca.pkl                 # PCA transformer to reduce input dimensions
│   ├── requirements.txt        # Python dependencies
│   └── Dockerfile              # Docker config for backend (optional)
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
│   └── Dockerfile              # Docker config for frontend (optional)
│
├── docker-compose.yml          # Combined deployment config (optional)
├── README.md                   # You're reading it
└── .gitignore                  # Files to ignore in Git
```


 

 
