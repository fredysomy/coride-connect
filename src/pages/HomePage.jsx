import { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import Car from "../assets/Card/car.svg";
import Bike from "../assets/Card/scooter.svg";
import location from "../assets/Card/Locationicon.svg";
import clock from "../assets/Card/Clock.svg";
import MyComponent from "../components/Suggestion.jsx";

export default function HomePage() {
  const [data, setData] = useState(null);
  const nav = useNavigate();
  const [searchValue, setSearch] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkCurrentUser();
        await fetchProfile();
        await fetchRidesData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  const checkCurrentUser = async () => {
    try {
      // Wait for Firebase to initialize and fetch the current user
      await auth.onAuthStateChanged((currentUser) => {
        // Check if currentUser is null
        if (currentUser) {
          setUserEmail(currentUser.email);
        } else {
          nav("/login");
        }
      });
    } catch (error) {
      console.error("Error checking current user:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const profileRef = collection(db, "profile");
      const q = query(profileRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const profileData = querySnapshot.docs[0].data(); // Assuming there's only one profile per user
        setProfile(profileData);
        console.log(profileData);
      } else {
        console.log("No profile found for the current user.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchRidesData = async () => {
    try {
      const ridesCollectionRef = collection(db, "offerride");
      const ridesQuerySnapshot = await getDocs(ridesCollectionRef);
      const ridesData = [];
      ridesQuerySnapshot.forEach((doc) => {
        ridesData.push({ ...doc.data(), docId: doc.id });
      });
      setData(
        ridesData.filter((ride) => ride.active == true && ride.passenger > 0)
      );
    } catch (error) {
      console.error("Error fetching rides data:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchValue);
    if (searchValue) {
      const filteredData = data.filter((ride) => {
        console.log(ride.interpoint);
        // Check if the search value is included in the drop location or any interpoint
        return (
          ride.drop.includes(searchValue) ||
          ride.interpoint.some((point) => point.includes(searchValue))
        );
      });
      setData(filteredData);
    } else {
      setData({}); // Set data to null when search value is empty
    }
  };

  if (!data || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  if (Object.keys(data).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No rides available</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end items-center p-4">
        <form className=" flex items-center" onSubmit={handleSearch}>
          <Autocomplete
            placeholder="Search"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
            apiKey={"AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"}
            options={{
              componentRestrictions: { country: "in" },
            }}
            onPlaceSelected={(place) => {
              setSearch(place.formatted_address);
            }}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center space-y-4 p-2 ">
        <h1 className="font-extrabold text-xl">Your Suggestions</h1>
        {data &&
          data
            .filter(
              (ride) =>
                ride.drop === profile.dest ||
                ride.interpoint.some((point) => point === profile.dest)
            )
            .map((ride, index) => (
              <MyComponent data={ride} key={index} />
            ))}
      </div>

      <div className="flex flex-col items-center space-y-4 p-2 ">
        <h1 className="font-extrabold text-xl">All Suggestion</h1>

        {data &&
          data.map((ride, index) => (
            <MyComponent data={ride} key={index} />
          ))}
      </div>
    </>
  );
}
