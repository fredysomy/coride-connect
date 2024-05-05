import { signInWithGooglePopup, db } from "../firebase/firebase.js";

import { collection, query, where, getDocs } from "firebase/firestore";
import img from "../assets/loginimage.svg";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const profileRef = collection(db, "profile");
    const q = query(profileRef, where("email", "==", response.user.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      nav("/home");
    } else {
      nav("/profile/create");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center flex-col text-center">
        <img src={img} className="mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          CO-RIDE CONNECT
        </h1>
        <p className="text-2xl text-black-300">
          Share the wheel, share the thrill! Carpooling: Making miles, making
          friends.
        </p>
        <button
          onClick={logGoogleUser}
          className="text-white font-bold bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mt-8"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
