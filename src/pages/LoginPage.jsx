

  import React from 'react';
  import{signInWithGooglePopup} from "../firebase/firebase.js";
  import img from '../assets/loginimage.svg';
  
  function LoginPage() 
   {
    const logGoogleUser =async() =>{
      const response=await signInWithGooglePopup();
      console.log(response);
    }
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center flex-col">
        <img src= {img} className="mb-4"/>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">CO-RIDE CONNECT</h1>
          <p className="text-2xl text-black-300">“Share the wheel, share the thrill! Carpooling: Making miles, making friends."</p>
          <button onClick={logGoogleUser} className="text-white font-bold bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mt-8">Sign In With Google</button>
          
      </div>
    </div>
  )
} 

export default LoginPage;
   


