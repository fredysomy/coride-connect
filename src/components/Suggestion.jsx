import React, { useState } from "react";
import { Card, CardContent } from '@mui/material'; 
import Car from "../assets/Card/car.svg"
import Bike from "../assets/Card/scooter.svg"
import location from "../assets/Card/Locationicon.svg"
import clock from "../assets/Card/Clock.svg"


export default function MyComponent() {
  const [data,setDate ]=useState({
    pickup:"Kottayam  ",
    dropoff:"Saintgits college of engineerings ",
    date:"3:00 PM, 21 Mar",
    distance:"10Km",
    vehicle:"Car"
  })

  return (
    <div className="w-full max-w-md rounded-lg shadow-sm bg-gray-300">
      <div className="flex justify-between py-2 px-2 ">
        <div className="flex flex-col justify-center">
        {data.vehicle === "Car" ? (
  <img src={Car} alt="Car" className="h-10 w-16" />
) : data.vehicle === "Bike" ? (
  <img src={Bike} alt="Bike" className="h-10 w-16" />
) : null}

         
          <span className="flex justify-center">{data.distance}</span>
          
          
        </div>
       
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-1">
            <img src={location} alt="loc icon" className="h-5 w-5" />
            <span className="font-semibold max-w-sm">{data.pickup}</span>
          </div>
          <div className="flex space-x-1">
          <img src={location} alt="loc icon" className="h-5 w-5" />
            <span className="font-semibold max-w-sm" >{data.dropoff}</span>
          </div>
          <div className="flex">
            <img src={clock} alt="clock icon" className="h-5 w-5" />
             <span className="pl-2">{data.date}</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-end">
        <button className="bg-custom-green text-white h-7 w-12 rounded-2xl">Ride</button>

        </div>
      </div>
    </div>
  );
}
