import React, { useState } from 'react';
import RatingStars from 'react-rating-stars-component';

export default function Review() {
  const [formData, setFormData] = useState({ text: "", rating: 0 });

  const handleChange = (event) => {
    setFormData({ ...formData, text: event.target.value });
  };

  const handleRating = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = () => {
    console.log("Form submitted with feedback:", formData.text, "and rating:", formData.rating);
    // Clear the feedback input field and reset rating
    setFormData({ text: "", rating: 0 });
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="max-w-screen-lg mx-auto shadow-md rounded-md ">
      <div className="text-center mb-4">
        <div className="bg-gray-300 flex flex-col items-center">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=female"
            alt="Irine Ann Jikku"
            className="mx-auto py-2 w-24 h-30 rounded-full"
          />
          <p className="text-xl font-semibold mb-1">Irine Ann Jikku</p>
        
          <RatingStars
            count={5}
            size={24}
            value={formData.rating}
            onChange={handleRating}
            activeColor="#000"
          />
          
          <p className="text-xl font-semibold mb-1 ml-2">{formData.rating}/5</p>
        </div>
      </div>
      <h4 className="text-lg font-semibold mb-4 text-center">Provide Feedback</h4>
      <textarea
        value={formData.text}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4 resize-none h-32 md:h-48 lg:h-64"
        placeholder="Enter your feedback..."
      ></textarea>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-900 text-white px-6 py-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full md:w-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
}