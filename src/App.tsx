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
import PasswordReset from "./pages/PasswordReset";
import Feed from "./pages/Feed";
import Messaging from "./pages/Messaging";
import UserProfilePage from "./pages/UserProfile";
import SearchResultsPage from "./pages/SearchResults";

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
          <Route
            path="/password-reset"
            element={
              <ProtectedRoute>
                <PasswordReset />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messaging"
            element={
              <ProtectedRoute>
                <Messaging />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/search-result" element={<SearchResultsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
