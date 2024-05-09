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
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen min-w-screen ">
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
                    <p className="flex justify-center text-black">{rating}</p>
                    <p className="text-black">Rating</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="flex justify-center text-black">
                      {profile.drive_exp}
                    </p>
                    <p className="text-black">Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-2 text-black text-left pl-2">
            Phone: {profile.phoneno}
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
              {profile.reviews.map((review, index) => (
                <div key={index} className="mb-2 bg-gray-300 rounded-lg">
                  <p className="mb-1 text-black text-left pl-2">{review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
