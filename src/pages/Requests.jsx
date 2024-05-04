import React, { useState, useEffect } from "react";

import "firebase/firestore"; // Import Firestore
import { db, auth } from "../firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
export default function Requests() {
  const [requests, setRequests] = useState([]);
  const authUser = auth.currentUser;

  useEffect(() => {
    console.log("authUser", authUser);
    if (authUser) {
      fetchBookRideData(authUser.email);
      console.log("Fetching data for user:", authUser.email);
    }
  }, [authUser]);

  const fetchBookRideData = async (userEmail) => {
    try {
      const bookRideQ = query(
        collection(db, "bookride"),
        where("offerer_email", "==", userEmail)
      );
      const querySnapshot = await getDocs(bookRideQ);

      if (!querySnapshot.empty) {
        const filteredRequests = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data:", data);
          filteredRequests.push(data);
        });

        console.log("Filtered requests:", filteredRequests);

        setRequests(filteredRequests);
      } else {
        console.log("No matching documents found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center font-sans text-2xl my-5 ">Requests</h2>
      {requests && requests.map(
        (request) =>
          console.log("Request:", request) ||
          (request.accpeted == false && (
            <div
              key={request.id}
              className="bg-white rounded shadow-md p-4 mb-4"
            >
              <div className="text-lg font-semibold mb-2">
                Booker Name: {request.booker_name}
              </div>
              <div className="text-gray-600 mb-2">
                Booker Email: {request.booker_email}
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200">
                Review Request
              </button>
            </div>
          ))
      )}
    </div>
  );
}
