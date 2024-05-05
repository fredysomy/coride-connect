import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import offerimg from "../assets/offerride.svg";
import {auth, db} from "../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Offerride() {
  const nav=useNavigate()
  const [input, setInput] = useState({
    pick: "",
    drop: "",
    active:false,
    type:"",
    time: "",
    passenger: 1,
    interpoint: [],
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleAddIntermediatePoint = () => {
    setInput({ ...input, interpoint: [...input.interpoint, ""] });
  };
  const handleIntermediatePointChange = (index, value) => {
    const updatedPoint = [...input.interpoint];
    updatedPoint[index] = value;
    setInput({ ...input, interpoint: updatedPoint });
  };
  const handleRemove = (index) => {
    const updatedPoint = [...input.interpoint];
    updatedPoint.splice(index, 1);
    setInput({ ...input, interpoint: updatedPoint });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!auth.currentUser) {
      console.log("User not authenticated.");
      return;
    }

    try {
      // Add data to Firestore collection
      const offerRef = collection(db, 'offerride'); // Ensure the collection name is correct
      const docRef = await addDoc(offerRef, {
        ...input,
        passenger: parseInt(input.passenger),
        offerer_email: user.email // Adding user's email to the input object
      });
      console.log("Offer successfully with ID: ", docRef.id);
      nav('/home')

    } catch (error) {
      console.error("Error adding data to Firestore: ", error);
    }
    console.log("Form submitted with data:", input);
  };

  return (
    <div className="mx-auto max-w-7xl ">
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
                  <input
                    id="pickup-location"
                    name="pick"
                    type="text"
                    placeholder="Enter pickup location"
                    className="mt-1 h-8 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={input.pick}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="drop-location"
                    className="block text-sm font-medium "
                  >
                    Drop-off Location
                  </label>
                  <input
                    id="drop-location"
                    name="drop"
                    type="text"
                    placeholder="Enter drop-off location"
                    className="mt-1 h-8 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={input.drop}
                    onChange={handleInputChange}
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
                  <input
                    type="text"
                    placeholder="Enter intermediate point"
                    className="mt-1 h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={point}
                    onChange={(e) =>
                      handleIntermediatePointChange(index, e.target.value)
                    }
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
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700"
                    >
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
                <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Vehicle
                  </label>
                  <select
                    id="type"
                    className="mt-1 block w-25 pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none sm:text-sm rounded-md"
                    type="text"
                    name="type"
                    onChange={handleInputChange}
                  >
                    <option>Car</option>
                    <option>Bike</option>
                   
                  </select>
                  <label
                    htmlFor="passengers"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Passengers
                  </label>
                  <select
                    id="passengers"
                    className="mt-1 block w-25 pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none sm:text-sm rounded-md"
                    type="number"
                    name="passenger"
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full l:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium  text-white bg-green-900 hover:bg-green-900 focus:outline-none focus:ring-none"
              >
                Offer Ride
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
