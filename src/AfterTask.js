import React, { useContext, useRef, useState, createContext, useEffect } from "react";
import { PointContext } from "./PointContext";
import { RightAns, WrongAns } from "./Ans";
import "./AfterTask.css";

export function AfterTask () {

   const [res, setRes] = useState(null);
   const [msg, setmsg] = useState(null);

   const [npArray, setNpArray] = useState([]);
   const { startPoint, setStartPoint, endPoint, setEndPoint} = useContext(PointContext);
   var np =[];

   const width = window.innerWidth;
   const height = window.innerHeight;

   let start = [...startPoint] ;
   let end = [...endPoint];

   const nineCoord = () => {

      let offsetX = width * 0.5;
      let offsetY = height * 0.5;
      let offset  = Math.round(Math.min(width*0.15, height*0.15));
      
      for(let i = 0; i < 3; i++) {
         if(i == 1) {
            offsetX  =  Math.round(offsetX - offset);
         } else if(i == 2) {
            offsetX  =  Math.round(offsetX + offset*2);
         }

         offsetY = height * 0.5;

         for(let j= 0; j < 3; j++) {
            if(j == 1) {
               offsetY  =  Math.round(offsetY- offset);
            } else if(j == 2) {
               offsetY  =  Math.round(offsetY + offset*2);
            }

            let indexs = [offsetX, offsetY];

            np.push(indexs)
      
         }
      }

      setNpArray(npArray => [...npArray, np]);
      let finalRes = decideResult();
      setRes(finalRes);
      console.log(finalRes);

   }

   const countDistance = (start, end) => {
      var distance = Math.sqrt((Math.pow(start[0]-end[0],2))+(Math.pow(start[1]-end[1],2)));
      return distance;
   }

   const decideConnected = () => {
      // const err = Math.min(width, height) * 1/1000;
      const err = 100;
      for(var i = 0; i < 3; i++) {
         var dist =  countDistance(start[i+1], end[i]);

         if(dist > err) {
            console.log("false from decideConnected part");
            return false;
         }
      }
      return true;
   }

   const decidePointOn = () => {
      console.log(np);

      var a={}, b={}, c={};

      for(var i = 0; i < 9; i++) {
         c.x = np[i][0];
         c.y = np[i][1];
         
         for(var j = 0; j < 4; j++) {
            a.x = start[j][0];
            a.y = height - start[j][1];
            b.x = end[j][0];
            b.y = height - end[j][1];

            var distance = Math.abs((c.y - b.y)*a.x - (c.x - b.x)*a.y + c.x*b.y - c.y*b.x) / Math.sqrt(Math.pow((c.y-b.y),2) + Math.pow((c.x-b.x),2));
            var dotproduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y)*(b.y - a.y);
            var squaredlengthba = (b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y);

            var ac = Math.sqrt(Math.pow((c.y-a.y),2) + Math.pow((c.x-a.x),2));
            var bc = Math.sqrt(Math.pow((c.y-b.y),2) + Math.pow((c.x-b.x),2));

            if(distance < 100 && dotproduct >= 0 && dotproduct < squaredlengthba){
               break;
            } else if(distance < 100){
               if(ac<100 || bc<100) {
                  break
               } 
            } else if(j == 3) {
  
               return false;
            }
         }
      }
      return true;
   }

   const decideResult = () => {
      if(!decideConnected()) {
         setmsg("Not Across Through All Points")
         return false
      }
      const result = decidePointOn();
      if(result) {
         setmsg("You Solved the Problem")
      } else {
         setmsg("Not Across Through All Points")
         
      }

      return result;
   }

   useEffect(() => {
      nineCoord();
    }, []);

   return (
      <div className = "parent">
        <hr />
        <div className = "content">
         <h2>Finished!</h2>
         {/* <button > Exit </button>   
         <button onClick={nineCoord}> View Results </button> */}
         {res ? ( <RightAns msg={msg}/>): ( <WrongAns msg={msg}/>)}
         </div>
      </div>
    );
}
  

