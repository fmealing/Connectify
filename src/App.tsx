import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import "./styles/main.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import Feed from "./pages/Feed";
import Messaging from "./pages/Messaging";
import UserProfilePage from "./pages/UserProfile";
import SearchResultsPage from "./pages/SearchResults";
import AboutPage from "./pages/About";

const App: React.FC = () => {
  return (
    <Router>
      {/* Ensure that Router wraps the entire component structure */}
      <div>
        <Navbar />
        {/* Set up routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Completed ✅ */}
          <Route path="/login" element={<Login />} /> {/* Completed ✅ */}
          <Route path="/signup" element={<Signup />} /> {/* Completed ✅ */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile /> {/* Completed ✅ */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed /> {/* Completed ✅ */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/messaging"
            element={
              <ProtectedRoute>
                <Messaging />{" "}
                {/* Will use external API for this. Just gives me too many headaches*/}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile/:userId"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/search-result" element={<SearchResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
