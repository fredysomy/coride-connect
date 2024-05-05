import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import your components
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfileCreatePage from "./pages/ProfileCreate";
import ProfileView from "./pages/ProfileView";
import Bookpage from "./pages/Bookpage";
import { StickyNavbar } from "./components/NavBar";
import RiderRequest from "./pages/RiderRequest";

function App() {
  return (
    <>
      <BrowserRouter>
        <StickyNavbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/create" element={<ProfileCreatePage />} />
          <Route path="/profile/view" element={<ProfileView />} />
          <Route path="/book_ride" element={<Bookpage/>}/>
          <Route path="/rider_req" element={<RiderRequest/>}/>
          </Routes>
      </BrowserRouter>

      </> 
  );
} 
export default App;