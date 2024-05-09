import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import Car from "../assets/Card/car.svg";
import Bike from "../assets/Card/scooter.svg";
import location from "../assets/Card/Locationicon.svg";
import clock from "../assets/Card/Clock.svg";

export default function HomePage() {
  const [data, setData] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const fetchRidesData = async () => {
      try {
        const ridesCollectionRef = collection(db, "offerride");
        const ridesQuerySnapshot = await getDocs(ridesCollectionRef);
        const ridesData = [];
        ridesQuerySnapshot.forEach((doc) => {
          ridesData.push({ ...doc.data(), docId: doc.id });
        });
        setData(
          ridesData.filter((ride) => ride.active == true && ride.passenger > 0),
        );
      } catch (error) {
        console.error("Error fetching rides data:", error);
      }
    };

    fetchRidesData();
  }, []);
  console.log(data);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex justify-center font-semibold">
        No Data to show now
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-2">
      {data &&
        data.map((ride, index) => (
          <div
            className="w-full max-w-md rounded-lg shadow-sm bg-gray-300  mx-3"
            key={index}
          >
            <div className="flex py-2 pl-2 pr-3">
              <div className="flex flex-col justify-center mr-10">
                {ride.type == "Car" ? (
                  <img src={Car} alt="Car" className="h-15 w-15" />
                ) : ride.type == "Bike" ? (
                  <img src={Bike} alt="Bike" className="h-15 w-15" />
                ) : null}
                <span className="flex justify-center">{ride.distance}</span>
              </div>
              <div className="flex flex-col space-y-2 mr-auto">
                <div className="flex space-x-1">
                  <img src={location} alt="loc icon" className="h-5 w-5" />
                  <span className="font-semibold max-w-md">{ride.pick}</span>
                </div>
                <div className="flex space-x-1">
                  <img src={location} alt="loc icon" className="h-5 w-5" />
                  <span className="font-semibold max-w-sm">{ride.drop}</span>
                </div>
                <div className="flex">
                  <img src={clock} alt="clock icon" className="h-5 w-5" />
                  <span className="font-serif pl-2">{ride.time}</span>
                </div>
              </div>
              <div className="flex flex-col justify-end ">
                <button
                  className="bg-custom-green text-white h-7 w-12 rounded-2xl"
                  onClick={() => nav(`/book_ride/${ride.docId}`)}
                >
                  Ride
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
