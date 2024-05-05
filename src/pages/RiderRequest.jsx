import React, { useState } from 'react';
import img from '../assets/profile pic.svg';

const RiderRequest = () => {
    const [name, setName] = useState('Jeslin');
    const [phoneNumber, setPhoneNumber] = useState('78657875756');
    const [destination, setDestination] = useState('Puthupally');
    const [startingPoint, setStartingPoint] = useState('Pathamuttom');
    const [time, setTime] = useState('3:30 pm');
    const [date, setDate] = useState('2024-05-03'); 
    const [estimatedFare, setEstimatedFare] = useState('$50'); 
    const [age, setAge] = useState(25); // Age
    const [location, setLocation] = useState('Nearby Location'); // Location
    const [passengers, setPassengers] = useState(1); // Number of Passengers

    return (
        <div className="flex justify-center items-center h-screen m-5">
            <div className="bg-white shadow-lg rounded-lg bg-gray-100 w-full max-w-md p-8">
                <div className="bg-gray-200 rounded-lg p-4 mb-6 flex flex-col items-center">
                    <img src={img} alt="Profile" className="w-16 h-16 rounded-full mb-2" /> {/* Photo */}
                    <p className="text-xl font-semibold">{name} Kuriakose</p> {/* Name */}
                </div>
                <span className="block text-center mb-4">📞 {phoneNumber}</span> {/* Phone Number */}
                <div className="h-px bg-black w-full mt-2 mb-2"></div> 
                <h2 className="text-xl font-semibold mb-2">Details</h2> {/* Heading */}
                <div className="mb-4 w-full">
                    <div className="flex items-center mb-2">
                        <span className="mr-2">👤</span> 
                        <span>Age: {age}</span> {/* Age */}
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">📍</span> 
                        <span>Location: {location}</span> {/* Location */}
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">👥</span> 
                        <span>Number of Passengers: {passengers}</span> {/* Number of Passengers */}
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🚩</span> 
                        <span>Starting Point: {startingPoint}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🏁</span>
                        <span>Destination: {destination}</span>
                    </div>
                    <div className= "items-left flex ">
                        <span>⏰ {time}</span>
                    </div>
                </div>
                <div className="h-px bg-black w-full mt-2 mb-2"></div> 
                <div className="mt-4">
                    Estimated Fare: <span>{estimatedFare}</span>
                </div>
                <div className="flex justify-between mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Accept</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reject</button>
                </div>
            </div>
        </div>
    );
}

export default RiderRequest;
