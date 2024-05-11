import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Rides() {
  const nav = useNavigate();
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const rideQuery = query(
            collection(db, "bookride"),
            where("booker_email", "==", user.email),
          );
          const querySnapshot = await getDocs(rideQuery);
          const fetchedRides = [];
          querySnapshot.forEach((doc) => {
            fetchedRides.push({ id: doc.id, ...doc.data() });
          });
          console.log(fetchedRides);
          setBooking(fetchedRides);
        } catch (error) {
          console.error("Error fetching rides:", error);
        }
      }
    });

    return unsubscribe;
  }, []);
  if (booking.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No Available Booking </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full p-4 space-y-4 font-poppins">
      {booking &&
        booking.map((ride) => (
          <div
            key={ride.id}
            className="bg-white shadow-md rounded-md p-6 flex flex-col"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Drop: {ride.drop}
            </h2>
            <p className="text-sm text-gray-600">Driver: {ride.name}</p>
            <p className="text-sm text-gray-600">
              Registration: {ride.vehicle_regno}
            </p>
            <p className="text-gray-700 flex flex-col">
              <span
                className={` font-semibold ${
                  ride.status === "rejected"
                    ? "text-red-500"
                    : ride.status === "completed"
                      ? "text-green-500"
                      : ride.status === "pending"
                        ? "text-yellow-500"
                        : "text-blue-500"
                }`}
              >
                Status: {ride.status.toUpperCase()}
              </span>
              {ride.status === "accepted" && (
                <button
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                  onClick={() => nav(`/review/${ride.id}`)}
                >
                  Complete Ride
                </button>
              )}
            </p>
            
          </div>
        ))}
    </div>
  );
}
