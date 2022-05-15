import React, { useContext, useRef, useState, createContext, useEffect } from "react";

import "./Ans.css";

export function RightAns ({msg}) {

   return(
      <>
      <div className = "message"> Success! {msg} :) </div>
      <p>(Click Start to try Again)</p>
      </>
   )
}

export function WrongAns ({msg}) {
   return(
      <>
      <div className = "message">Failed ! {msg} :( </div>
      <p>(Click Start to try Again)</p>
      </>
   )
}
