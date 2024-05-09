import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const RiderRequest = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [request, setRequest] = useState(null);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const rideDocRef = doc(db, "bookride", id);
        const querySnapshot = await getDoc(rideDocRef);
        if (!querySnapshot.empty) {
          setRequest({ id: querySnapshot.id, ...querySnapshot.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };

    fetchRequest();
  }, [id]);
  const AcceptBooking = async () => {
    console.log(request);
    try {
      setAccepting(true);
      // Fetch the offer document reference
      const offerRef = doc(collection(db, "offerride"), request.offer_id);
      const offerDocSnapshot = await getDoc(offerRef);

      if (offerDocSnapshot.exists()) {
        const offerData = offerDocSnapshot.data();
        if (offerData.passenger > 0) {
          // Reduce the passenger count
          const newPassenger = offerData.passenger - 1;
          await updateDoc(offerRef, { passenger: newPassenger });

          // Update the bookride document status
          const bookRef = doc(collection(db, "bookride"), request.id);
          await updateDoc(bookRef, { status: "accepted" });

          // Send notification
          const url =
            "https://svps-backend-99c87df9aa95.herokuapp.com/send-notification";
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: request.booker_email,
              title: "Ride Accepted",
              body: "Congrats your ride has been accepted",
              url: "http://localhost:5173/requests",
            }),
          };

          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data);
        } else {
          alert("You have exhausted the passenger limit");
        }
      } else {
        console.log("Offer document not found");
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
    setAccepting(false);
    nav("/requests");
  };

  const RejectBooking = async () => {
    setRejecting(true);
    console.log(id);
    const bookRef = await doc(collection(db, "bookride"), id);
    console.log(bookRef);
    await updateDoc(bookRef, {
      status: "rejected",
    });
    const url =
      "https://svps-backend-99c87df9aa95.herokuapp.com/send-notification";
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: `{"email":"${request.booker_email}","title":"Ride Rejected","body":"Sorry your ride has been rejected","url":"http://localhost:5173/requests"}`,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setRejecting(false);
    nav("/requests");
  };

  if (!request) {
    return <div>Loading...</div>;
  }

  const { name, phoneno, drop, pick, time, img, fare, age, home, passenger } =
    request;
  return (
    <div className="flex justify-center items-center h-screen m-5">
      <div className="bg-white shadow-lg rounded-lg bg-gray-100 w-full max-w-md p-8">
        <div className="bg-gray-200 rounded-lg p-4 mb-6 flex flex-col items-center">
          <img
            src={img}
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2"
          />{" "}
          {/* Photo */}
          <p className="text-xl font-semibold">{name}</p> {/* Name */}
        </div>
        <span className="block text-center mb-4">📞 {phoneno}</span>{" "}
        {/* Phone Number */}
        <div className="h-px bg-black w-full mt-2 mb-2"></div>
        <h2 className="text-xl font-semibold mb-2">Details</h2> {/* Heading */}
        <div className="mb-4 w-full">
          <div className="flex items-center mb-2">
            <span className="mr-2">👤</span>
            <span>Age: {age}</span> {/* Age */}
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">📍</span>
            <span>Location: {home}</span> {/* Location */}
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">👥</span>
            <span>Number of Passengers: {passenger}</span>{" "}
            {/* Number of Passengers */}
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">🚩</span>
            <span>Starting Point: {pick}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">🏁</span>
            <span>Destination: {drop}</span>
          </div>
          <div className="items-left flex ">
            <span>⏰ {time}</span>
          </div>
        </div>
        <div className="h-px bg-black w-full mt-2 mb-2"></div>
        <div className="mt-4">
          Estimated Fare: <span>{fare}</span>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className={`bg-custom-green text-white font-bold py-2 px-4 rounded ${
              accepting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={accepting ? null : AcceptBooking} // Disable onClick when accepting
          >
            {accepting ? "Accepting..." : "Accept"}
          </button>
          <button
            className={`bg-custom-green text-white font-bold py-2 px-4 rounded ${
              rejecting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={rejecting ? null : RejectBooking} // Disable onClick when rejecting
          >
            {rejecting ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiderRequest;
