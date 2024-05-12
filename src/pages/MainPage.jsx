import img from "../assets/loginimage.svg";

function MainPage() {
  return (
    <div className="font-poppins flex justify-center">
      <div className="max-w-3xl w-full mx-8 bg-white  p-8">
        <img src={img} className="mb-8 mx-auto max-h max-w" alt="Login" />
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
           CO-RIDE CONNECT
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Share the wheel, share the thrill! Carpooling: Making miles, making
          friends.
        </p>
        <div className="text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            SVPS revolutionizes campus commuting by offering a smart,
            sustainable, and community-driven solution tailored for colleges
            and universities. Our platform leverages cutting-edge technology to
            facilitate seamless vehicle sharing among students, faculty, and
            staff, reducing congestion, lowering carbon emissions, and fostering
            a sense of community. Join us in redefining campus commutes for a
            greener, more connected future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
