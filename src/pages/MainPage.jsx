import img from "../assets/loginimage.svg";

function MainPage() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center flex-col">
        <img src={img} className="mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          CO-RIDE CONNECT
        </h1>
        <p className="text-2xl text-black-300 text-center">
          Share the wheel, share the thrill! Carpooling: Making miles, making
          friends.
        </p>
        <p>Some other basic things of the app</p>
        <p>Random words</p>
        <p>More random words</p>
      </div>
    </div>
  );
}

export default MainPage;
