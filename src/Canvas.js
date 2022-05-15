import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas() {
  const {canvasRef, initCanvas,startDrawing, endDrawing, draw, putDots } = useCanvas();

  useEffect(() => {
    initCanvas();
    putDots();
  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}