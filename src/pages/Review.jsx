import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import RatingStars from "react-rating-stars-component";

import { QRCode } from "react-qrcode-logo";
import {
  collection,
  doc,
  getDoc,
  where,
  query,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";

export default function Review() {
  const { id } = useParams(); // Get id from URL params
  const [formData, setFormData] = useState({ text: "", rating: 0 });
  const [bookRideData, setBookRideData] = useState(null);
  const [offererProfile, setOffererProfile] = useState(null);

  useEffect(() => {
    // Fetch book ride data using id
    const fetchBookRideData = async () => {
      try {
        const bookRideDoc = await doc(db, "bookride", id);
        const bookRide = await getDoc(bookRideDoc);
        if (!bookRide.empty) {
          setBookRideData(bookRide.data());
          console.log(bookRideData);
          // After fetching book ride data, fetch offerer's profile
          fetchOffererProfile(bookRide.data().offerer_email);
        } else {
          console.log("No booking found!");
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookRideData();
  }, [id]);

  const fetchOffererProfile = async (offererEmail) => {
    try {
      const profileDocRef = collection(db, "profile");
      const q = query(profileDocRef, where("email", "==", offererEmail));
      const profileDocSnap = await getDocs(q);
      if (!profileDocSnap.empty) {
        profileDocSnap.forEach((doc) => {
          setOffererProfile(doc.data());
          console.log(offererProfile);
        });
      } else {
        console.log("No offerer profile found!");
      }
    } catch (error) {
      console.error("Error fetching offerer profile:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, text: event.target.value });
  };

  const handleRating = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  // Update profile document
  const updateProfile = async () => {
    const profileDocRef = collection(db, "profile");
    const q = query(profileDocRef, where("email", "==", offererProfile.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      try {
        const profileDoc = doc.data();
        // Update the desired fields in the document
        const updatedReviews = [...profileDoc.reviews, formData.text];
        const updatedStars = [...profileDoc.ratings, formData.rating];
        await updateDoc(doc.ref, {
          reviews: updatedReviews,
          ratings: updatedStars,
        });

        console.log("Profile document successfully updated!");
      } catch (error) {
        console.error("Error updating profile document: ", error);
      }
    });
  };

  // Update offerride document
  const updateOfferride = async () => {
    try {
      const offerrideDocRef = doc(db, "offerride", bookRideData.offer_id);
      await updateDoc(offerrideDocRef, {
        passenger: increment(1),
        active:false
      });
      console.log("Offerride document successfully updated!");
    } catch (error) {
      console.error("Error updating offerride document: ", error);
    }
  };

  // Update booking document
  const updateBooking = async () => {
    try {
      const bookingDocRef = doc(db, "bookride", id); // Assuming id is the booking ID
      await updateDoc(bookingDocRef, {
        status: "completed",
      });
      console.log("Booking document successfully updated!");
    } catch (error) {
      console.error("Error updating booking document: ", error);
    }
  };

  const handleSubmit = async (e) => {
    await updateProfile();
    await updateOfferride();
    await updateBooking();
e.target.innerText="Submited"
document.querySelector('.feedback').style.display="none"
  };
  if (!bookRideData || !offererProfile) {
    return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
      </div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto shadow-md font-poppins rounded-md m-5 p-5 ">
      <div className="feedback">
      <div className="text-center mb-4">
        <div className="bg-gray-300 flex flex-col items-center">
          <img
            src={offererProfile.img}
            alt="Irine Ann Jikku"
            className="mx-auto py-2 w-24 h-30 rounded-full"
          />
          <p className="text-xl font-semibold mb-1">{offererProfile.name}</p>

          <RatingStars
            count={5}
            size={24}
            value={formData.rating}
            onChange={handleRating}
            activeColor="#000"
          />

          <p className="text-xl font-semibold mb-1 ml-2">{formData.rating}/5</p>
        </div>
      </div>
      <h4 className="text-lg font-semibold mb-4 text-center">
        Provide Feedback
      </h4>
      <textarea
        value={formData.text}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4 resize-none h-32 md:h-48 lg:h-64"
        placeholder="Enter your feedback..."
      ></textarea>
      <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-900 text-white px-6 py-4 rounded-md hover:bg-green-900 focus:outline-none focus:bg-green-600 w-full md:w-auto"
        >
          Submit Review
        </button>
      
      </div>

      <div className="w-1/2 mx-auto my-5">
        <QRCode
          value={`upi://pay?pa=${offererProfile.upiid}&pn=Intellemo&tn=cftrhwetaw4gta&am=${bookRideData.fare}`}
          size="200"
          logoWidth="80"
          logoHeight="70"
          logoOpacity="0.6"
        />
      </div>
      <div className="flex justify-center">
      <a
        href={`upi://pay?pa=${offererProfile.upiid}&pn=Intellemo&tn=cftrhwetaw4gta&am=${bookRideData.fare}`}
      >
        {" "}
        <button className="flex justify-center bg-green-900 text-white px-6 py-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full md:w-auto">
          Pay
        </button>
      </a>
      </div>
    </div>
  );
}
