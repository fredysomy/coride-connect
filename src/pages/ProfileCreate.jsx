

import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth, db} from "../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";
export default function ProfileCreate() {
  const [input, setInput] = useState({
    name: "",
    age: "",
    email: "",
    phoneno: "",
    institution: "",
    license: "",
    ratings:[],
    reviews:[],
    role: "",
    drive_exp: "",
    vehicle_regno:""
  });
  const nav=useNavigate()

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
      const profileRef = collection(db, 'profile'); // Ensure the collection name is correct
      const docRef = await addDoc(profileRef, {
        ...input,
        email: user.email // Adding user's email to the input object
      });
      console.log("User profile added successfully with ID: ", docRef.id);
      nav('/home')

    } catch (error) {
      console.error("Error adding user profile:", error);
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(e.target.value)
  };

  console.log(input)


  return (

    <div className="bg-white-100 text-black pt-8 lg:pl-8 lg:mx-auto max-w-md m-10">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Name
          </label>
          <input
            className="mt-1 block w-full rounded-lg border-none border-gray-300 shadow-sm focus:border-transparent focus:ring-0 sm:text-sm px-4 py-2"
            id="name"
            name="name"
            placeholder="Enter your name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Age
          </label>
          <input
            className="mt-1 block w-full rounded-lg border-none border-gray-300 shadow-sm focus:border-transparent focus:ring-0 sm:text-sm px-4 py-2"
            id="Age"
            name="age"
            placeholder="Enter your Age"
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
            name="institution"
            placeholder="Enter your institution"
            type="text"
            onChange={handleChange}
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
            <label className="block text-sm font-medium">
            Drive Experiance
          </label>
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
