import React, { useState } from 'react';
import img from '../assets/profile pic.svg';

const Bookpage = () => {
    const [name, setName] = useState('Jeslin');
    const [rating, setRating] = useState(5);
    const [experience, setExperience] = useState('3');
    const [phoneNumber, setPhoneNumber] = useState('78657875756');
    const [destination, setDestination] = useState('Puthupally');
    const [startingPoint, setStartingPoint] = useState('Pathamuttom');
    const [time, setTime] = useState('3:30 pm');
    const [date, setDate] = useState('2024-05-03'); // Add date state
    const [estimatedFare, setEstimatedFare] = useState('$50'); // Add estimated fare state

    return (
        <div className="flex justify-center items-center h-screen m-5">
            <div className="bg-white shadow-lg rounded-lg bg-gray-100 w-full max-w-md p-8">
                <div className="flex items-center mb-6 flex-col bg-gray-200 rounded-lg p-4">
                    <img src={img} alt="Profile" className="w-16 h-16 rounded-full" />
                    <div className="items-center">
                        <p className="text-xl font-semibold text-center">{name}</p>
                        <div className="flex justify-between w-40">
                            <div className="text-center">
                                <span className="block text-lg font-bold">{rating} ⭐</span>
                                <span className="text-sm">Rating</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-lg font-bold">{experience}</span>
                                <span className="text-sm">Year</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <span className="block">
                        📞 {phoneNumber}
                    </span>
                    <div className="h-px bg-black w-full mb-2"></div> {/* Black line */}
                </div>
                <div className="mb-4 w-full">
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🚩</span> {/* Icon */}
                        <span>{startingPoint}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🏁</span> {/* Icon */}
                        <span>{destination}</span>
                    </div>
                    <div className="ml-10">
                        <div>⏰ {time}</div>
                        <div>📅 {date}</div>
                    </div>
                    <div className="h-px bg-black w-full mt-2"></div> {/* Black line */}
                    <div className="mt-4">
                        Estimated Fare: <span>{estimatedFare}</span>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full">
                    Book Ride
                </button>
            </div>
        </div>
    );
}

export default Bookpage;
