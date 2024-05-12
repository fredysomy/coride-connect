import React, { useState } from "react";

import Car from "../assets/Card/car.svg";
import Bike from "../assets/Card/scooter.svg";
import location from "../assets/Card/Locationicon.svg";
import clock from "../assets/Card/Clock.svg";

import { MdMyLocation } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function MyComponent({data,index}) {
  const nav = useNavigate();

  return (
    <div className="w-full max-w-md rounded-lg shadow-sm bg-gray-300 ">
      <div className="flex justify-between py-2 px-2 ">
        <div className="flex flex-col justify-center">
          {data.type === "Car" ? (
            <img src={Car} alt="Car" className="h-10 w-16" />
          ) : data.type === "Bike" ? (
            <img src={Bike} alt="Bike" className="h-10 w-16" />
          ) : null}

          
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-1">
            <img src={location} alt="loc icon" className="h-5 w-5" />
            {console.log(data)}
            <span className="font-semibold max-w-sm font-poppins">{data.pick.split(",")[0]}</span>
          </div>
          <div className="flex space-x-1">
            <img src={location} alt="loc icon" className="h-5 w-5" />
            <span className="font-semibold max-w-sm font-poppins">{data.drop.split(",")[0]}</span>
          </div>
          <div className="flex">
            <img src={clock} alt="clock icon" className="h-5 w-5" />
            <span className="pl-2 font-poppins">{data.time}</span>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <button className="bg-custom-green text-white h-10 w-24 rounded-2xl "onClick={() => nav(`/book_ride/${data.docId}`)}>
            Ride
          </button>
        </div>
      </div>
    </div>
  );
}
