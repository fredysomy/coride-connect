import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {db} from "../firebase/firebase";
import RatingStars from "react-rating-stars-component";
import { collection,doc,getDoc,where,query,getDocs } from "firebase/firestore";

export default function Review() {
  const { id } = useParams(); // Get id from URL params
  const [formData, setFormData] = useState({ text: "", rating: 0 });
  const [bookRideData, setBookRideData] = useState(null);
  const [offererProfile, setOffererProfile] = useState(null);

  useEffect(() => {
    // Fetch book ride data using id
    const fetchBookRideData = async () => {
      try {
        const bookRideDoc = await doc(db,"bookride",id)
        const bookRide=await getDoc(bookRideDoc)
        if (!bookRide.empty) {
          setBookRideData(bookRide.data());
          console.log(bookRideData)
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
        profileDocSnap.forEach(doc => {
          setOffererProfile(doc.data());
          console.log(offererProfile)
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

  const handleSubmit = async () => {
    try {
      // Append review and stars to offerer's profile
      const updatedReviews = [...offererProfile.reviews, formData.text];
      const updatedStars = [...offererProfile.stars, formData.rating];

      await firestore.collection("profiles").doc(offererProfile.id).update({
        reviews: updatedReviews,
        stars: updatedStars,
      });

      console.log(
        "Form submitted with feedback:",
        formData.text,
        "and rating:",
        formData.rating
      );
      // Clear the feedback input field and reset rating
      setFormData({ text: "", rating: 0 });
      // Reload the page or any other necessary action after submission
      window.location.reload();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!bookRideData || !offererProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto shadow-md rounded-md m-5 p-5 ">
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
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-900 text-white px-6 py-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full md:w-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
