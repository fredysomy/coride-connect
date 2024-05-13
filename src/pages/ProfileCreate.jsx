import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import Autocomplete from "react-google-autocomplete";
import { toast, Toaster } from "sonner";
export default function ProfileCreate() {
  const [input, setInput] = useState({
    name: "",
    age: "",
    email: "",
    phoneno: "",
    img: "",
    institution: "",
   
    interpoint: [],
    license: "",
    ratings: [],
    reviews: [],
    role: "",
    drive_exp: "",
    vehicle_regno: "",
    upiid: "",
    mileage: 1,
  });
  const nav = useNavigate();
  const [dest, setDest] = useState("");
  const [home, setHome] = useState("");

  const isStateEmpty = () => {
    if (input.role === "Driver" || input.role === "Both") {
      return (
        !input.name ||
        !input.age ||
        !input.phoneno ||
        !input.institution ||
        !home ||
        !dest ||
        !input.license ||
        !input.role ||
        !input.drive_exp ||
        !input.vehicle_regno ||
        !input.upiid
      );
    } else {
      return (
        !input.name ||
        !input.age ||
        !input.phoneno ||
        !input.institution ||
        !home ||
        !dest ||
        !input.role ||
        !input.upiid
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if user is logged in
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      setInput({ ...input, email });
    } else {
      console.log("User is not logged in.");
      return;
    }

    try {
      if (!isStateEmpty()) {
        const profileRef = collection(db, "profile"); // Ensure the collection name is correct
        const docRef = await addDoc(profileRef, {
          ...input,
          mileage: parseInt(input.mileage),
          dest:dest,home:home,
          img: user.photoURL,
          email: user.email, // Adding user's email to the input object
        });
        console.log("User profile added successfully with ID: ", docRef.id);
        nav("/home");
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (error) {
      console.error("Error adding user profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(e.target.value);
  };

  console.log(input);

  return (
    <div className="bg-white-100 font-poppins text-black pt-8 lg:pl-8 lg:mx-auto max-w-md m-10">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 block w-full rounded-lg border-none border-gray-300 shadow-sm focus:border-transparent focus:ring-0 sm:text-sm px-4 py-2"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={input.name}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            className="mt-1 block w-full rounded-lg border-none border-gray-300 shadow-sm focus:border-transparent focus:ring-0 sm:text-sm px-4 py-2"
            id="Age"
            name="age"
            value={input.age}
            placeholder="Enter your Age"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Upi Id</label>
          <input
            className="mt-1 block w-full rounded-lg border-none border-gray-300 shadow-sm focus:border-transparent focus:ring-0 sm:text-sm px-4 py-2"
            id="upiid"
            value={
              input.upiid
            }
            name="upiid"
            placeholder="Enter UPI ID"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Institution
          </label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-4 py-2"
            id="institution"
            value={input.institution}
            name="institution"
            placeholder="Enter your institution"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Home
          </label>
          <Autocomplete
            placeholder="Enter Home"
            
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
            apiKey={"AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"}
            options={{
              componentRestrictions: { country: "in" },
            }}
            onPlaceSelected={(place) => {
             setHome(place.formatted_address);
            }}
            
            
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Destination
          </label>
          <Autocomplete
            placeholder="Enter Destination"
          
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
            apiKey={"AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"}
            options={{
              componentRestrictions: { country: "in" },
            }}
            onPlaceSelected={(place) => {
              setDest(place.formatted_address);
            }}
            
            
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-4 py-2"
            id="phone"
            name="phoneno"
            value={input.phoneno}
            placeholder="Enter your phone number"
            type="tel"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="role">
            Role
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-4 py-2"
            id="role"
            name="role"
            onChange={handleChange}
          >
            <option value="">Select your role</option>
            <option value="Driver">Driver</option>
            <option value="Rider">Rider</option>
            <option value="Both">Both</option>
          </select>
        </div>
        {(input.role === "Driver" || input.role === "Both") && (
          <div>
            <label className="block text-sm font-medium" htmlFor="license">
              Driver License Number
            </label>
            <input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-4 py-2"
              id="license"
              name="license"
              placeholder="Enter your driver license number"
              type="text"
              onChange={handleChange}
            />
            <label className="block text-sm font-medium" htmlFor="email">
              Mileage
            </label>
            <input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-4 py-2"
              id="mileage"
              name="mileage"
              placeholder="Enter your mileage"
              type="number"
              onChange={handleChange}
            />
            <label className="block text-sm font-medium">
              Drive Experiance
            </label>
            <div></div>

            <input
              className="mt-1 block w-full rounded-lg border-none border-gray-300 shadow-sm focus:border-transparent focus:ring-0 sm:text-sm px-4 py-2"
              id="exp"
              name="drive_exp"
              placeholder="Enter Driving Experiance"
              type="text"
              onChange={handleChange}
            />
            <label className="block text-sm font-medium">
              Vehicle Registration Number
            </label>
            <input
              className="mt-1 block w-full rounded-lg border-none border-gray-300 shadow-sm focus:border-transparent focus:ring-0 sm:text-sm px-4 py-2"
              id="vehicle_regno"
              name="vehicle_regno"
              placeholder="Enter your Car Registration Number"
              type="text"
              onChange={handleChange}
            />
          </div>
        )}
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-750 focus:outline-none focus:ring-0"
          type="submit"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
