import React, { useState,useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, where, getDoc ,doc} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const RiderRequest = () => {
    const {id} = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const rideDocRef = doc(db, 'bookride', id);
                const querySnapshot = await getDoc(rideDocRef);
                if (!querySnapshot.empty) {
                    setRequest({ id: querySnapshot.id, ...querySnapshot.data() });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching request:', error);
            }
        };

        fetchRequest();
    }, [id]);

    if (!request) {
        return <div>Loading...</div>;
    }

    const {
        name,
        phoneno,
        drop,
        pick,
        time,
        date,
        img,
        estimatedFare,
        age,
        home,
        passenger
    } = request;
    return (
        <div className="flex justify-center items-center h-screen m-5">
            <div className="bg-white shadow-lg rounded-lg bg-gray-100 w-full max-w-md p-8">
                <div className="bg-gray-200 rounded-lg p-4 mb-6 flex flex-col items-center">
                    <img src={img} alt="Profile" className="w-16 h-16 rounded-full mb-2" /> {/* Photo */}
                    <p className="text-xl font-semibold">{name}</p> {/* Name */}
                </div>
                <span className="block text-center mb-4">📞 {phoneno}</span> {/* Phone Number */}
                <div className="h-px bg-black w-full mt-2 mb-2"></div> 
                <h2 className="text-xl font-semibold mb-2">Details</h2> {/* Heading */}
                <div className="mb-4 w-full">
                    <div className="flex items-center mb-2">
                        <span className="mr-2">👤</span> 
                        <span>Age: {age}</span> {/* Age */}
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">📍</span> 
                        <span>Location: {home}</span> {/* Location */}
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">👥</span> 
                        <span>Number of Passengers: {passenger}</span> {/* Number of Passengers */}
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🚩</span> 
                        <span>Starting Point: {pick}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🏁</span>
                        <span>Destination: {drop}</span>
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
