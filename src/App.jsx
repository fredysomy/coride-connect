import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import your components
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfileCreatePage from "./pages/ProfileCreate";
import ProfileView from "./pages/ProfileView";
import Review from "./pages/Review";
import { StickyNavbar } from "./components/NavBar";


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
          <Route path="/Review" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;