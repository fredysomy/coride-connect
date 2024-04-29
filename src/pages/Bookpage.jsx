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

    return (
        <div className="flex justify-center items-center h-screen m-5">
            <div className="bg-white shadow-lg rounded-lg bg-gray-100 w-full max-w-md p-8">
                <div className="flex items-center mb-6 flex-col">
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
                <div className="mb-4">
                    <span className="block">
                        📞 {phoneNumber}
                    </span>
                </div>
                <hr />
                <div className="mb-4 w-full">
                    <div>
                        🕿 {startingPoint}
                    </div>
                    <span>
                        🏁 {destination}
                    </span>
                    <span>
                        ⏰ {time}
                    </span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full">
                    Book Ride
                </button>
            </div>
        </div>
    );
}

export default Bookpage;
