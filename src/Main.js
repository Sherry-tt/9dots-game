import React, { useState } from "react";
import App from "./App";
import Instruct from "./pages/Instruct";
import './stylesheets/Main.css';

function Main() {

   const [seeInstr, setSeeInstr]  = useState(false)
   const [gameStart, setGameStart]  = useState(false)

   function clickIns () {
      setSeeInstr(!seeInstr)
   }

   const startGame = () => {
      setGameStart(!gameStart)
   }


   return (
     <>
     <div className="title">Nine Dots Game</div>

     <div lassName="div2">

     <button onClick={clickIns} className= "buttonS button-4">Rule</button>
     {seeInstr ? <Instruct /> : <h className = "divb">( Click here to view more instructions )</h>}
     </div>
  
     <div className="div2">
      <button onClick={startGame} className= "buttonS button-4">Start</button>
      {gameStart ? <App /> : <h className = "divb">( Click here to Start Game )</h>}
     </div>
     </>
   );
 }


 export default Main;