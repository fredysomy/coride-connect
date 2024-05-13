import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import offerimg from "../assets/offerride.svg";
import { auth, db } from "../firebase/firebase.js";
import Autocomplete from "react-google-autocomplete";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function Offerride() {
  const nav = useNavigate();
  const [pick, setPick] = useState("");
  const [drop, setDrop] = useState("");
  const [offering,setOffering]=useState(false)
  const [input, setInput] = useState({
    active: false,
    time: "",
    type: "",
    mileage: 0,
    passenger: 1,
    interpoint: [],
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleAddIntermediatePoint = () => {
    setInput({ ...input, interpoint: [...input.interpoint, ""] });
  };

  const handleRemove = (index) => {
    const updatedPoint = [...input.interpoint];
    updatedPoint.splice(index, 1);
    setInput({ ...input, interpoint: updatedPoint });
  };
  const isStateEmpty = () => {
    
return (
      !pick ||
      !drop ||
      !input.time ||
      !input.type ||
      !input.mileage ||
      !input.passenger 
    );}
  

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const user = auth.currentUser;
    if (!auth.currentUser) {
      console.log("User not authenticated.");
      return;
    }

    try {
      // Add data to Firestore collection
      if(isStateEmpty()){
        toast.error("Please fill all the fields")
        return;
      }
      else {
        setOffering(true)
        const offerRef = collection(db, "offerride"); // Ensure the collection name is correct
      const docRef = await addDoc(offerRef, {
        ...input,
        drop: drop,
        pick: pick,
        created: new Date(),
        passenger: parseInt(input.passenger),
        offerer_email: user.email, // Adding user's email to the input object
      });
      console.log("Offer successfully with ID: ", docRef.id);
      toast.success("Offer successfully created, go to My rides and activate it");
      nav("/myrides");
      }
    } catch (error) {
      console.error("Error adding data to Firestore: ", error);
    }
    console.log("Form submitted with data:", input);
  };

  return (
    <div className="mx-auto max-w-7xl font-poppins px-5">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="pt-5 text-green-900 flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Let’s Travel Together</h1>

            <img src={offerimg} alt="offering" className="h-30 w-30" />
          </div>

          <form
            className="grid gap-6 bg-blue-gray-50 rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-4 p-2">
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="pickup-location"
                    className="block text-sm font-medium"
                  >
                    Pickup Location
                  </label>
                  <Autocomplete
                    apiKey={"AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
                    options={{
                      componentRestrictions: { country: "in" },
                    }}
                    onPlaceSelected={(place) => {
                      setPick(place.formatted_address);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="drop-location"
                    className="block text-sm font-medium "
                  >
                    Drop-off Location
                  </label>
                  <Autocomplete
                    apiKey={"AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
                    options={{
                      componentRestrictions: { country: "in" },
                    }}
                    onPlaceSelected={(place) => {
                      setDrop(place.formatted_address);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md  bg-white hover:bg-grey-50 focus:outline-none focus:ring-2 focus:ring-green-900"
                  onClick={handleAddIntermediatePoint}
                >
                  Add Intermediate Points
                </button>
              </div>
              {input.interpoint.map((point, index) => (
                <div className="flex items-center" key={index}>
                  <Autocomplete
                    apiKey={"AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
                    options={{
                      componentRestrictions: { country: "in" },
                    }}
                    onPlaceSelected={(place) => {
                      const updatedPoint = [...input.interpoint];
                      updatedPoint[index] = place.formatted_address;
                      setInput({ ...input, interpoint: updatedPoint });
                    }}
                  />
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center py-1.5 px-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-900"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium">
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={input.time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium">
                    Vehicle
                  </label>
                  <select
                    id="type"
                    className="mt-1 block w-25 pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none sm:text-sm rounded-md"
                    type="text"
                    value={input.type}
                    name="type"
                    onChange={handleInputChange}
                  >
                    <option value="choose">Choose Vehicle</option>
                    <option value="Bike">Bike</option>
                    <option value="Car">Car</option>
                  </select>
                  <div>
                    <label
                      htmlFor="drop-location"
                      className="block text-sm font-medium pt-2 "
                    >
                      Mileage
                    </label>
                    <input
                      type="number"
                      id="mileage"
                      name="mileage"
                      value={input.mileage}
                      onChange={handleInputChange}
                    />
                  </div>
                  <label
                    htmlFor="passengers"
                    className="block text-sm font-medium text-gray-700 pt-3"
                  >
                    Number of Passengers
                  </label>
                  <select
                    id="passengers"
                    className="mt-1 block w-25 pt-2 pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none sm:text-sm rounded-md"
                    type="number"
                    name="passenger"
                    onChange={handleInputChange}
                  >
                    {input.type === "Bike" ? (
                      <option value={1}>1</option>
                    ) : (
                      <>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
            <button
          disabled={offering}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full ${
              offering ? "cursor-not-allowed opacity-50" : ""
            }
            
            `}
            onClick={offering ? null : handleSubmit} // Disable onClick when loading
          >
            {offering ? "Offering..." : "Offer Ride"}
          </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
