// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi8BhbPLYVZ2P3Z4FmYJ5Dz4jm1gd63wY",
  authDomain: "hgfg-75aa5.firebaseapp.com",
  projectId: "hgfg-75aa5",
  storageBucket: "hgfg-75aa5.appspot.com",
  messagingSenderId: "783385628961",
  appId: "1:783385628961:web:8a5704e3e035600811ae60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);