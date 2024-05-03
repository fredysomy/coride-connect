import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import your components
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfileCreatePage from "./pages/ProfileCreate";
import ProfileView from "./pages/ProfileView";
import { StickyNavbar } from "./components/NavBar";

import MainPage from "./pages/MainPage";

import Offerride from "./pages/Offeride.jsx";
import Review from "./pages/Review.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <StickyNavbar />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/create" element={<ProfileCreatePage />} />
          <Route path="/profile/view" element={<ProfileView />} />
          <Route path="/offerride" element={<Offerride/>} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
