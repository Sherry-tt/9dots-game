import React, { useContext, useRef, useState, createContext } from "react";
import { TimeContext } from "./TimeContext";
import { PointContext } from "./PointContext";

const CanvasContext = createContext();


export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const [line, setLine] = useState(false);


  const { resTime, setResTime} = useContext(TimeContext);
  const { startPoint, setStartPoint, endPoint, setEndPoint} = useContext(PointContext);

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 10;
    contextRef.current = context;

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
    let id = -1;

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

  const finishDrawing = () => {
    contextRef.current.closePath();
    // newLine();

    setIsDrawing(false);
    setResTime(resTime-1);
    
  };

  function newLine() {
    const start = startPoint[3-resTime];
    const end = endPoint[3-resTime];
    contextRef.current.beginPath();
    console.log(start);
    contextRef.current.strokeStyle = "red";
    contextRef.current.moveTo(start[0], start[1]);
    contextRef.current.lineTo(end[0], end[1]);
    contextRef.current.stroke();
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

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        putDots,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);