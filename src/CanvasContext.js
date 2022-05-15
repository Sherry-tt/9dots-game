import React, { useContext, useRef, useState, createContext } from "react";
import { TimeContext } from "./contexts/TimeContext";
import { PointContext } from "./contexts/PointContext";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [line, setLine] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const { resTime, setResTime} = useContext(TimeContext);
  const { startPoint, setStartPoint, endPoint, setEndPoint} = useContext(PointContext);

  const initCanvas = () => {
    canvasRef.current.width = window.innerWidth * 2;
    canvasRef.current.height = window.innerHeight * 2;
    canvasRef.current.style.width = `${window.innerWidth}px`;
    canvasRef.current.style.height = `${window.innerHeight}px`;

    contextRef.current = canvasRef.current.getContext("2d")
    contextRef.current.scale(2, 2);
    contextRef.current.lineCap = "round";
    contextRef.current.strokeStyle = "black";
    contextRef.current.lineWidth = 10;
  };

  const putDots = () => {

    const width = parseInt(canvasRef.current.style.width, 10);
    const height = parseInt(canvasRef.current.style.height, 10)

    let offsetX = width * 0.5;
    let offsetY = height * 0.5;
    const movX = width * 1/1000;
    const movY = height * 1/1000;
    let offset  = Math.round(Math.min(width*0.15, height*0.15));
  
    contextRef.current.lineWidth = 30;

    for(let i = 0; i < 3; i++) {
      if(i == 1) {
        offsetX  =  Math.round(offsetX - offset);
      } else if(i == 2) {
        offsetX  =  Math.round(offsetX + offset*2);
      }

      for(let j= 0; j < 3; j++) {
        if(j == 1) {
          offsetY  =  Math.round(offsetY- offset);
        } else if(j == 2) {
          offsetY  =  Math.round(offsetY + offset*2);
        }
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX+movX, offsetY+movY);
        contextRef.current.stroke();
        contextRef.current.closePath();
      }
      offsetY  =  offsetY- offset;
    }
    contextRef.current.lineWidth = 10;
  };

  const startDrawing = ({ nativeEvent }) => {
    setLine(false);
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setStartPoint(startPoint => [...startPoint, [offsetX, offsetY]]);
    setEndPoint(endPoint => [...endPoint, [offsetX, offsetY]]);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setResTime(resTime-1);
  };

  function newLine() {
    const start = startPoint[3-resTime];
    const end = endPoint[3-resTime];
    contextRef.current.beginPath();
    contextRef.current.strokeStyle = "red";
    contextRef.current.lineWidth = 4;
    contextRef.current.moveTo(start[0], start[1]);
    contextRef.current.lineTo(end[0], end[1]);
    contextRef.current.stroke();
    contextRef.current.lineWidth = 10;
    contextRef.current.strokeStyle = "black";
    contextRef.current.closePath();
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      if(!line && resTime != 4){
        newLine()
        setLine(true)
      }
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    const arr = [...endPoint];
    arr[4-resTime] = [offsetX, offsetY];
    setEndPoint(arr);
  };

  return (
    <div>
      <CanvasContext.Provider value={{canvasRef, initCanvas, startDrawing, endDrawing, draw, putDots,}}>
        {children}
      </CanvasContext.Provider>
    </div>
  );
};

export const useCanvas = () => useContext(CanvasContext);