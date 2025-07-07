import React, { useRef, useEffect } from 'react';
import './DrawingCanvas.css';

function DrawingCanvas({ onSubmit, theme }) {
  const canvasRef = useRef(null);
  const CANVAS_SIZE = 280;

  // Fill white on load
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, []);

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };

  const submitCanvas = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    console.log(dataUrl);
    onSubmit(dataUrl);
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (e.buttons !== 1) return;

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 7, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <div className={`canvas-wrapper ${theme}`}>
      <canvas
        ref={canvasRef}
        onMouseMove={draw}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="drawing-canvas"
      ></canvas>

      <div className="canvas-controls">
        <button className="canvas-btn predict-btn" onClick={submitCanvas}>
          🔮 Predict
        </button>
        <button className="canvas-btn clear-btn" onClick={clearCanvas}>
          🧼 Clear
        </button>
      </div>
    </div>
  );
}

export default DrawingCanvas;
