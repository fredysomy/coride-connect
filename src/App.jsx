import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import your components
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfileCreatePage from "./pages/ProfileCreate";
import ProfileView from "./pages/ProfileView";
import { StickyNavbar } from "./components/NavBar";
import MainPage from "./pages/MainPage";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
