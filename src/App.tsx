import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Correct import from react-router-dom
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/main.scss";

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
