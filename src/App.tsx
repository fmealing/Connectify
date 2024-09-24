import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Correct import from react-router-dom
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import "./styles/main.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordReset from "./pages/PasswordReset";
import Feed from "./pages/Feed";
import Messaging from "./pages/Messaging";
import UserProfilePage from "./pages/UserProfile";

const App: React.FC = () => {
  return (
    <Router>
      {/* Ensure that Router wraps the entire component structure */}
      <div>
        <Navbar />
        {/* Set up routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
