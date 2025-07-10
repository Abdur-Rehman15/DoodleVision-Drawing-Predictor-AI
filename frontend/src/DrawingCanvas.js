import React, { useRef, useEffect, useState } from 'react';
import './DrawingCanvas.css';

function DrawingCanvas({ onSubmit, onClear, theme }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const CANVAS_SIZE = 280;

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
    if (onClear) onClear();
  };

  const submitCanvas = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSubmit(dataUrl);
  };

  // Drawing with mouse
  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    drawCircle(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);

  // Drawing with touch
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDrawing(true);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    drawCircle(x, y);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const drawCircle = (x, y) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <div className={`canvas-wrapper ${theme}`}>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="drawing-canvas"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
