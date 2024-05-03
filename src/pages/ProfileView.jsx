import React from "react";

export default function ProfileView() {
  const profile = {
    name: "Irine Ann Jikku",
    rating: 4.3,
    exp: 1,
    number: 9034024928,
    age: 22,
    location: "Kottayam, Kerala",
    DL_number: 57855766768,
    seat: 4,
    reg_no: "KL84829",
    reviews: [
      { name: "Rahul", comment: "It was a wonderful experience travelling with kajjfuhaufahfuhaih jfhafaff  hfuiahfuhau" },
      { name: "Jerin", comment: "Nice to drive" },
      { name: "jeslin", comment: "Very Bad Ride" }
    ]
  };

  return (
    <div className="min-h-screen min-w-screen ">
      <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden">
        <div>
          <div className="bg-gray-300 ">
            <div className="flex justify-center p-5 mb-4">
              <img
                className="w-24 h-24 rounded-full"
                src="https://xsgames.co/randomusers/avatar.php?g=female"
                alt="Profile Avatar"
              />
            </div>
            <div className="mb-2 ">
              <h1 className="text-2xl font-bold flex justify-center text-black pb-2">{profile.name}</h1>
              <div className="rounded-lg">
                <div className="flex justify-center gap-20 pb-5 ">
                  <div className="flex flex-col ">
                    <p className="flex justify-center text-black">{profile.rating}</p>
                    <p className="text-black">Rating</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="flex justify-center text-black">{profile.exp}</p>
                    <p className="text-black">Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-2 text-black text-left pl-2">Phone: {profile.number}</p>
          <hr className="my-4 bg-black" />
          
          <div>
            <h2 className="text-lg font-semibold mb-2 text-black underline pl-2">Details</h2>
            <p className="mb-1 text-black text-left pl-2">Age: {profile.age}</p>
            <p className="mb-1 text-black text-left pl-2">Location: {profile.location}</p>
            <p className="mb-1 text-black text-left pl-2">DL Number: {profile.DL_number}</p>
            <p className="mb-1 text-black text-left pl-2">Available seat: {profile.seat}</p>
            <p className="mb-1 text-black text-left pl-2">Registration Number: {profile.reg_no}</p>
          </div>

          <hr className="my-4" />

          <div>
            <h2 className="text-lg font-semibold text-black underline">Reviews</h2>
            <div className="rounded-lg">
              {profile.reviews.map((review, index) => (
                <div key={index} className="mb-2 bg-gray-300 rounded-lg">
                  <p className="mb-1 text-black text-left pl-2">{review.name}</p>
                  <p className="mb-1 text-black text-left pl-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
