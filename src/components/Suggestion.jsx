import React, { useState, useEffect } from "react";
import {getDoc, doc } from 'firebase/firestore';
import { db } from "../firebase/firebase.js";
import Car from "../assets/Card/car.svg";
import Bike from "../assets/Card/scooter.svg";
import location from "../assets/Card/Location.svg";
import clock from "../assets/Card/Clock.svg";

export default function MyComponent() {
  const [data, setData] = useState({});
  

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const offerDocRef = doc(db, 'offerride',"TRihD7v5OOdnbWFqEjN9");
        const offerDocSnap = await getDoc(offerDocRef);
        if (!offerDocSnap.empty) {
          setData(offerDocSnap.data());
          console.log(offerDocSnap.data());
        } 
        else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching offer data:', error);
      }
    };

    fetchOfferData();
  }, [id]);
  console.log(data)

  if (!data || Object.keys(data).length === 0) {
    return <div className="flex justify-center font-semibold">Loading...</div>;
  }

  return (
<div className="w-full max-w-md rounded-lg shadow-sm bg-gray-300">
      <div className="flex py-2 pl-2 pr-3">
        <div className="flex flex-col justify-center mr-10">
          {data.type === "Car" ? (
            <img src={Car} alt="Car" className="h-15 w-15" />
          ) : data.type === "Bike" ? (
            <img src={Bike} alt="Bike" className="h-15 w-15" />
          ) : null}
          <span className="flex justify-center">{data.distance}</span>
        </div>
        <div className="flex flex-col space-y-2 mr-auto">
          <div className="flex space-x-1">
            <img src={location} alt="loc icon" className="h-5 w-5" />
            <span className="font-semibold max-w-md">{data.pick}</span>
          </div>
          <div className="flex space-x-1">
            <img src={location} alt="loc icon" className="h-5 w-5" />
            <span className="font-semibold max-w-sm" >{data.drop}</span>
          </div>
          <div className="flex">
            <img src={clock} alt="clock icon" className="h-5 w-5" />
            <span className="font-serif pl-2">{data.time}</span>
          </div>
        </div>
        <div className="flex flex-col justify-end ">
          <button className="bg-custom-green text-white h-7 w-12 rounded-2xl">Ride</button>
        </div>
      </div>
    </div>
  );
}
