import { useState, useEffect } from "react";

import "firebase/firestore"; // Import Firestore
import { db, auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const nav = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Hide loader once the auth state is determined
    });

    if (currentUser) {
      fetchBookRideData(currentUser.email);
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [currentUser]);

  const fetchBookRideData = async (userEmail) => {
    try {
      const bookRideQ = query(
        collection(db, "bookride"),
        where("offerer_email", "==", userEmail),
      );
      const querySnapshot = await getDocs(bookRideQ);

      if (!querySnapshot.empty) {
        const filteredRequests = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          console.log("Document data:", data);
          filteredRequests.push(data);
        });

        console.log("Filtered requests:", filteredRequests);
        let first_filter= filteredRequests.filter((request) => request.status == "pending")
       setRequests(first_filter.sort((a,b)=> a.created - b.created))
        
        //   filteredRequests.filter((request) => request.status == "pending"),
        // );
        console.log(requests);
      } else {
        console.log("No matching documents found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  if (requests.length===0) {
    return <div className="flex justify-center items-center h-screen">
  <p>No Available Request</p>
  </div>;
  }
  return (
    <div className="max-w-lg mx-auto font-poppins">
      <h2 className="text-center font-sans text-2xl my-5">Requests</h2>

      {requests &&
        requests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <div className="text-lg font-semibold mb-4">
              Booker Name: {request.booker_name}
            </div>
            <div className="text-gray-600 mb-2">
              Booker Email: {request.booker_email}
            </div>
            <div className="text-gray-600 mb-2">Drop: {request.drop}</div>
            <button
              className="bg-custom-green text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
              onClick={() => nav(`/request/${request.id}`)}
            >
              Review Request
            </button>
          </div>
        ))}
    </div>
  );
}
