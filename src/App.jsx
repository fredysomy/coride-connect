import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { getToken, onMessage } from "firebase/messaging";
import { messaging, auth, db } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfileCreatePage from "./pages/ProfileCreate";
import ProfileView from "./pages/ProfileView";
import Bookpage from "./pages/Bookpage";
import { StickyNavbar } from "./components/NavBar";
import RiderRequest from "./pages/RiderRequest";
import MainPage from "./pages/MainPage";

import Offerride from "./pages/Offeride.jsx";
import Review from "./pages/Review.jsx";
import Requests from "./pages/Requests.jsx";
import MyRides from "./pages/MyRides.jsx";
import Message from "./components/Message";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from 'sonner'
import Rides from "./pages/Rides.jsx";

// ...



function App() {
  async function requestPermission(email) {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BLIMB8wiN1qGoo9FgKbHUBHnZe-CFJrGH2I3rEDhQI-shQKUP8b77CF0KAqi_X-qDkLn_Pzw0ALGsqZUArZ326w",
        });

        // Construct the query for the tokens collection
        const tokenQuery = query(
          collection(db, "tokens"),
          where("email", "==", email),
        );

        // Execute the query to get the snapshot of documents matching the query condition
        const tokenSnapshot = await getDocs(tokenQuery);

        if (!tokenSnapshot.empty) {
          const existingToken = tokenSnapshot.docs[0].data().token;

          if (existingToken !== token) {
            // Update token if it's different
            const tokenDocRef = doc(db, "tokens", tokenSnapshot.docs[0].id);
            await updateDoc(tokenDocRef, { token: token });
            console.log("Token updated:", token);
          } else {
            console.log("Token is already up to date:", token);
          }
        } else {
          // Store token in Firestore if it doesn't exist
          await setDoc(doc(collection(db, "tokens")), {
            email: email,
            token: token,
          });
          console.log("Token stored in database:", token);
        }
      } else if (permission === "denied") {
        // Notifications are blocked
        alert("You denied permission for notifications.");
      }
    } catch (error) {
      console.error("Error retrieving or storing device token:", error);
    }
  }

  onMessage(messaging, (payload) => {
    toast.message(payload.notification.title, {
      description: payload.notification.body,
    })
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        requestPermission(user.email);
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <>
     <Toaster  position="top-center" />
      <BrowserRouter>
        <StickyNavbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/create" element={<ProfileCreatePage />} />
          <Route path="/profile/view" element={<ProfileView />} />
          <Route path="/request/:id" element={<RiderRequest />} />
          <Route path="/book_ride/:id" element={<Bookpage />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/offerride" element={<Offerride />} />
          <Route path="/review" element={<Review />} />
          <Route path="/myrides" element={<MyRides />} />
          <Route path="/rides" element={<Rides />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
