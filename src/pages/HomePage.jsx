import { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { getDocs, collection} from "firebase/firestore";
import { db,auth } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import Car from "../assets/Card/car.svg";
import Bike from "../assets/Card/scooter.svg";
import location from "../assets/Card/Locationicon.svg";
import clock from "../assets/Card/Clock.svg";

export default function HomePage() {
  const [data, setData] = useState(null);
  const nav = useNavigate();
  const [searchValue, setSearch] = useState("");
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        // Wait for Firebase to initialize and fetch the current user
        await auth.onAuthStateChanged((currentUser) => {
          // Check if currentUser is null
          if (!currentUser) {
            // Navigate to a specific route if currentUser is null
            nav('/login');
          }
        });
      } catch (error) {
        console.error('Error checking current user:', error);
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
          ridesData.filter((ride) => ride.active == true && ride.passenger > 0),
        );
      } catch (error) {
        console.error("Error fetching rides data:", error);
      }
    };
    

    fetchRidesData(),checkCurrentUser();
  }, []);


  const handleSearch = (event) => {
    event.preventDefault();
   
    console.log(searchValue)
  
    if (searchValue) {
      const filteredData = data.filter((ride) => {
        console.log(ride.interpoint)
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

  


  if (!data) {
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
      <form className=" flex items-center"
      onSubmit={handleSearch}
      >
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

      
      <button type="submit" className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green">
        Search
      </button>
    </form></div>
      
      <div className="flex flex-col items-center space-y-4 p-2 ">
    {data &&
      data.map((ride, index) => (
        <div
        className="w-full rounded-lg shadow-sm bg-gray-300 mx-3 transition-transform duration-300 hover:scale-105 lg:hover:scale-95" key={index}
        >
          <div className="flex py-2 pl-2 pr-3">
            <div className="flex flex-col justify-center mr-10">
              {ride.type == "Car" ? (
                <img src={Car} alt="Car" className="h-15 w-15 " />
              ) : ride.type == "Bike" ? (
                <img src={Bike} alt="Bike" className="h-15 w-15" />
              ) : null}
              <span className="flex justify-center">{ride.distance}</span>
            </div>
            <div className="flex flex-col space-y-2 mr-auto">
              <div className="flex space-x-1">
                <img src={location} alt="loc icon" className="h-5 w-5" />
                <span className="font-normal font-poppins max-w-md">{ride.pick}</span>
              </div>
              <div className="flex space-x-1">
                <img src={location} alt="loc icon" className="h-5 w-5" />
                <span className="font-normal font-poppins max-w-sm">{ride.drop}</span>
              </div>
              <div className="flex">
                <img src={clock} alt="clock icon" className="h-5 w-5" />
                <span className="font-poppins pl-2">{ride.time}</span>
              </div>
            </div>
            <div className="flex flex-col justify-end ">
              <button
                className="bg-custom-green text-white h-7 w-12 font-poppins rounded-2xl "
                onClick={() => nav(`/book_ride/${ride.docId}`)}
              >
                Ride
              </button>
            </div>
          </div>
        </div>
      ))}
  </div></>
    
   
  );
}
