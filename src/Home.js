import React, { useState, useMemo } from "react";
import App from "./App";
import Instruct from "./Instruct";

function Home() {

   var choose = false;
   const [seeInstr, setSeeInstr]  = useState(false)
   const [gameStart, setGameStart]  = useState(false)


   function clickIns () {
      setSeeInstr(!seeInstr)
   }

   const startGame = () => {
      setGameStart(!gameStart)
   }

   const title ={
      fontFamily: "Arial",
      textAlign: "center",
      padding: 0,
      margin: 0,
      fontSize: 28,
      fontFamily: "Raleway"
   }

   const button = {
      display:"inline-block",
      border:"0.1em solid #FFFFFF",
      margin:"0 0.3em 0.3em 0",
      borderRadius:"0.12em",
      boxSizing: "border-box",
      textDecoration:"none",
      fontFamily:'Roboto',
      fontWeight:300,
      color:"black",
      textAlign:"center",
      transition: "all 0.2s",
      display:"block",
   }


   return (
     <>

     <div style={title}>Nine Dots Game</div>

     <button onClick={clickIns} style={button}>RULE</button>
     {seeInstr ? <Instruct /> : <p>( Click here to view more instructions )</p>}

     <button onClick={startGame} style={button}>START</button>
     
     {gameStart ? <App /> : <div>( Click here to Start Game )</div>}
     
     </>
   );
 }


 export default Home;