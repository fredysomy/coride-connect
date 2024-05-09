import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const MyRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const rideQuery = query(
            collection(db, "offerride"),
            where("offerer_email", "==", user.email),
          );
          const querySnapshot = await getDocs(rideQuery);
          const fetchedRides = [];
          querySnapshot.forEach((doc) => {
            fetchedRides.push({ id: doc.id, ...doc.data() });
          });
          setRides(fetchedRides);
        } catch (error) {
          console.error("Error fetching rides:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleToggle = async (rideId, active) => {
    try {
      const rideRef = doc(db, "offerride", rideId);
      await updateDoc(rideRef, {
        active: active,
      });
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride.id === rideId ? { ...ride, active: active } : ride,
        ),
      );
    } catch (error) {
      console.error("Error updating ride:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center font-sans text-2xl my-5">My Rides</h2>
      {rides &&
        rides.map((ride) => (
          <div key={ride.id} className="bg-white rounded shadow-md p-4 mb-4">
            <div className="text-lg font-semibold mb-2">
              {ride.pick} - {ride.drop}
            </div>
            <div className="text-gray-600 mb-2">
              Active: {ride.active ? "Yes" : "No"}
            </div>
            <button
              onClick={() => handleToggle(ride.id, !ride.active)}
              className="bg-custom-green  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              {ride.active ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default MyRides;
