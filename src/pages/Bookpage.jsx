import  { useState,useEffect } from 'react';
import img from '../assets/profile pic.svg';
import { auth, db } from "../firebase/firebase.js";
import { useParams } from 'react-router-dom';
import { collection, query, where, getDoc,doc, getDocs } from 'firebase/firestore';
const Bookpage = () => {
    const {id} =useParams()
    const [offerData, setOfferData] = useState(null);
    const [offererData, setOffererData] = useState(null);
    const [rating,setRating]=useState(0);

    // Function to fetch offer data from Firestore
    const fetchOfferData = async () => {
        try {
          const offerDocRef = doc(db, 'offerride', id);
          const offerDocSnap = await getDoc(offerDocRef);
          if (offerDocSnap.exists()) {
            setOfferData(offerDocSnap.data());
            console.log(offerDocSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching offer data:', error);
        }
      };
      
      // Function to fetch offerer profile data from Firestore
      const fetchOffererData = async () => {
        try {
          const offererEmail = offerData?.offerer_email;
          if (offererEmail) {
            const profileDocRef = collection(db, 'profile');
            const q = query(profileDocRef, where("email", "==", offererEmail));
            const profileDocSnap = await getDocs(q);
            if (!profileDocSnap.empty) {
              setOffererData(profileDocSnap.docs[0].data())
              console.log(profileDocSnap.docs[0].data());
              setRating(profileDocSnap.docs[0].data().rating.reduce((a, b) => a + b, 0) / profileDocSnap.docs[0].data().rating.length || 0)
            } else {
              console.log('No profile document found for offerer email:', offererEmail);
            }
          }
        } catch (error) {
          console.error('Error fetching offerer data:', error);
        }
      };

    useEffect(() => {
        if (id) {
            fetchOfferData();
        }
    }, [id]);

    useEffect(() => {
        if (offerData) {
            fetchOffererData();
        }
    }, [offerData]);


    return (
        <div className="flex  items-center h-screen ">
            {offerData && offererData && (
             <div className="bg-white shadow-lg rounded-lg bg-gray-100 w-full max-w-md p-8">
                <div className="flex items-center mb-6 flex-col bg-gray-200 rounded-lg p-4">
                    <img src={img} alt="Profile" className="w-16 h-16 rounded-full" />
                    <div className="items-center">
                        <p className="text-xl font-semibold text-center">{offererData.name}</p>
                        <div className="flex justify-between w-40">
                            <div className="text-center">
                                <span className="block text-lg font-bold">{rating} ⭐</span>
                                <span className="text-sm">Rating</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-lg font-bold">{offererData.drive_exp}</span>
                                <span className="text-sm">Year</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <span className="block">
                        📞 {offererData.phoneno}
                    </span>
                    <div className="h-px bg-black w-full mb-2"></div> 
                </div>
                <div className="mb-4 w-full">
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🚩</span> 
                        <span className='text-3xl'>{offerData.pick}</span>
                    </div>
                    <div className='ml-10'>
                        {offerData.interpoint.map((point, index) => (
                            <div key={index}>
                                <span>📍</span>
                                <span>{point}</span>
                            </div>
                        ))
                        }
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">🏁</span> 
                        <span  className='text-3xl'>{offerData.drop}</span>
                    </div>
                    <div className="">
                        <span>⏰ {offerData.time}</span>
                       
                    </div>
                    <div className="h-px bg-black w-full mt-2"></div>
                    <div className="mt-4">
                        Estimated Fare: <span>10</span>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-full">
                    Book Ride
                </button>
            </div> )}
        </div>
    );
}

export default Bookpage;
