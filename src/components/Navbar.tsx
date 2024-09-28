import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle the profile click
  const handleProfileClick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/profile"); // Redirect to profile if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  const isLoggedIn = localStorage.getItem("authToken") !== null;

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/feed"); // Redirect to feed if logged in
    } else {
      navigate("/"); // Redirect to home if not logged in
    }
  };

  return (
    <nav className="bg-background text-text px-10 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <a href="/" onClick={handleLogoClick}>
        <img
          src="/svg/logo-no-background.svg"
          alt="Connectify Logo"
          className="h-10"
        />
      </a>

      {/* Search Bar with cohesive border and outline */}
      <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full w-1/2 h-12 px-5 shadow-sm transition duration-200 ease-in-out focus-within:ring-2 focus-within:ring-primary">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search user"
          className="bg-white pl-3 pr-4 py-2 text-base text-gray-700 w-full rounded-full focus:outline-none"
        />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 font-body">
        {/* Messages Link */}
        <li className="h-12 px-4 rounded-full border border-primary flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition duration-200 ease-in-out">
          <a href="/messaging" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
            <p className="text-primary text-base font-medium font-inter leading-tight">
              Messages
            </p>
          </a>
        </li>

        {/* Profile Link */}
        <li
          className="h-12 px-4 bg-accent rounded-full flex items-center justify-center gap-2 hover:bg-accent-dark transition duration-200 ease-in-out"
          onClick={handleProfileClick}
        >
          <a href="/profile" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUser} className="text-white" />
            <p className="text-white text-base font-medium font-inter leading-tight">
              Profile
            </p>
          </a>
        </li>
      </ul>

      {/* Mobile Menu Icon (for future implementation) */}
      <div className="md:hidden">
        {/* Add hamburger icon here for mobile */}
      </div>
    </nav>
  );
};

export default Navbar;
