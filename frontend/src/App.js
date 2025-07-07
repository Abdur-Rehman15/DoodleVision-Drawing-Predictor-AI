import React, { useState, useEffect } from 'react';
import DrawingCanvas from './DrawingCanvas';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [doodleHistory, setDoodleHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const [celebrate, setCelebrate] = useState(false);

  const handleSubmit = async (image) => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      setPrediction(data.prediction);
      setConfidence(parseFloat(data.confidence));
      setDoodleHistory(prev => [...prev.slice(-4), { image, prediction: data.prediction }]);

      if (parseFloat(data.confidence) >50) {
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 3000);
      }
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (celebrate) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      document.body.appendChild(confetti);
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 3000);
    }
  }, [celebrate]);

  return (
    <div className={`app-container ${theme}`}>
      {celebrate && <div className="celebration-overlay"></div>}

      <header className="app-header">
        <h1 className="app-title">
          <span className="title-word">Doodle</span>
          <span className="title-word">Vision</span>
          <span className="subtitle">AI Sketch Detectivee</span>
        </h1>

        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <div className="main-content">
        <div className={`canvas-container ${theme}`}>
          <div className="canvas-header">
            <h2>Draw something and I'll guess what it is!</h2>
            <p className="instructions">
              Try one of these: Apple, Bucket, Butterfly, Crown, Ladder
            </p>
          </div>

          <DrawingCanvas onSubmit={handleSubmit} theme={theme} />

          <div className="prediction-result">
            {isLoading ? (
              <div className="loading-animation">
                <div className="spinner"></div>
                <p>Analyzing your masterpiece...</p>
              </div>
            ) : prediction ? (
              <>
                <h3 className="prediction-text">
                  I see... <span className="highlight">{prediction}</span>!
                </h3>
                <div className="confidence-meter">
                  <div
                    className="confidence-fill"
                    style={{ width: `${confidence}%` }}
                  ></div>
                  <span className="confidence-value">
                    Confidence: {confidence}%
                  </span>
                </div>
                {confidence > 80 && (
                  <div className="success-message">🎉 Wow, that's clear!</div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <p>Your prediction will appear here</p>
              </div>
            )}
          </div>
        </div>

        {doodleHistory.length > 0 && (
          <div className="history-section">
            <h3>Your Recent Doodles</h3>
            <div className="history-grid">
              {doodleHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <img
                    src={item.image}
                    alt={`Doodle of ${item.prediction}`}
                    className="history-image"
                  />
                  <div className="history-label">{item.prediction}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Abdur Rehman | Made with ❤️ for doodlers everywhere</p>
      </footer>
    </div>
  );
}

export default App;
