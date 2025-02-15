import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
export default function ProfileView() {
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [rating, setRating] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        setUserData(user);
      } else {
        // If user is not logged in, redirect to /login
        history.push("/login");
      }
    });

    return unsubscribe;
  }, [history]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRef = collection(db, "profile");
        const q = query(profileRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const profileData = querySnapshot.docs[0].data(); // Assuming there's only one profile per user
          setProfile(profileData);
          setRating(
            profileData.ratings.reduce((a, b) => a + b, 0) /
              profileData.ratings.length || 0,
          );
        } else {
          console.log("No profile found for the current user.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      console.log(userData.photoURL);
    };

    if (userEmail) {
      fetchProfile();
    }
  }, [userEmail]);

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
  </div>;
  }
  return (
    <div className="min-h-screen min-w-screen font-poppins m-5">
      <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden">
        <div>
          <div className="bg-gray-300 ">
            <div className="flex justify-center p-5 mb-4">
              <img
                className="w-24 h-24 rounded-full"
                src={userData.photoURL}
                alt="Profile Avatar"
              />
            </div>
            <div className="mb-2 ">
              <h1 className="text-2xl font-bold flex justify-center text-black pb-2">
                {profile.name}
              </h1>
              <div className="rounded-lg">
                <div className="flex justify-center gap-20 pb-5 ">
                  <div className="flex flex-col ">
                    <span className="flex justify-center text-black">{rating.toFixed(0)}⭐</span>
                    <p className="text-black">Rating</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="flex justify-center text-black">
                      {profile.drive_exp || 0}
                    </p>
                    <p className="text-black">Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-2 text-black text-left pl-2">
          📞: {profile.phoneno}
          </p>
          <hr className="my-4 bg-black" />

          <div>
            <h2 className="text-lg font-semibold mb-2 text-black underline pl-2">
              Details
            </h2>
            <p className="mb-1 text-black text-left pl-2">Age: {profile.age}</p>
            <p className="mb-1 text-black text-left pl-2">
              DL Number: {profile.license}
            </p>
            <p className="mb-1 text-black text-left pl-2">
              Registration Number: {profile.vehicle_regno}
            </p>
          </div>

          <hr className="my-4" />

          <div>
            <h2 className="text-lg font-semibold text-black underline">
              Reviews
            </h2>

            <div className="rounded-lg">
              {profile.reviews.map((data, index) => (
                <div key={index} className="mb-2 bg-gray-300 rounded-lg p-3">
                  <h3 className="text-md font-semibold  text-black ">{data.user}</h3>
                  
                  <p className="mb-1 text-black text-left mt-3">↪{" "}{data.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
