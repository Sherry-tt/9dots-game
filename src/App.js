
import React, { useState} from "react";
import './stylesheets/App.css';
import { Canvas } from './Canvas'
import { AfterTask } from './AfterTask'
import { CanvasProvider } from "./CanvasContext";
import { TimeContext } from "./contexts/TimeContext";
import { PointContext } from "./contexts/PointContext";

function App() {
  const [resTime, setResTime] = useState(4);
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  const userName = "Mike";

  return (
    <>
      <hr />
      <p className = "remain"> You have <b>{resTime} </b> times remain...</p>

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
