import React, { useState } from "react";
import { Card, CardContent } from '@mui/material'; 
import Car from "../assets/car.svg"
export default function MyComponent() {
  const [data,setDate ]=useState({
    pickup:"Kottayam",
    dropoff:"Saintgits",
    date:"3:00 PM, 21 Mar",
    distance:"10Km"
      
  })
  return (
   <div>  <Card className="w-full max-w-sm p-4  rounded-lg shadow-md">
      <CardContent className="flex justify-between space-x-3">
       <div>
       <img src={Car} alt="offering" className="h-30 w-30" />
        <span>{data.distance}</span>
        <div className="flex items-center space-x-1">
           
           <span>{data.date}</span>
         </div>
       </div>
        
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-1">
          
            <span className="font-semibold">{data.pickup}</span>
          </div>
          <div className="flex items-center space-x-1">
            
            <span className="font-semibold">{data.dropoff}</span>
          </div>
        
        </div>
        
        <div className="m-auto">
          <button className="bg-green-900  text-white px-2 py-1 rounded-md ">Join Ride</button>
        </div>
      </CardContent>
    </Card></div>
  
  );
}
