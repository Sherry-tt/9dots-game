
import React, { useState, useMemo } from "react";
import './App.css';
import { Canvas } from './Canvas'
import { AfterTask } from './AfterTask'
import Dots from './Dots'
import { ClearCanvasButton } from './ClearCanvasButton';
import { CanvasProvider } from "./CanvasContext";
import { useCanvas } from "./CanvasContext";
import { TimeContext } from "./TimeContext";
import { PointContext } from "./PointContext";

// export function App() {
function App() {
  const [resTime, setResTime] = useState(4);
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  const userName = "Mike";

  return (
    <>
      <TimeContext.Provider value= {{resTime, setResTime}}>
        <PointContext.Provider value= {{startPoint, setStartPoint, endPoint, setEndPoint}}>
          <CanvasProvider>
            {resTime > 0 ? (<Canvas />) : (<AfterTask />)}
          </CanvasProvider>
        </PointContext.Provider>
      </TimeContext.Provider>


    </>
  );
}

export default App;
