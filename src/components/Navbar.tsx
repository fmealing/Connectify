import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEnvelope,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to track mobile menu open/close

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

  // Function to handle the search input and redirect to the search results page
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-result?query=${searchQuery}`); // Redirect to the search results page with the query
    }
  };

  // Function to handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

      {/* Search Bar (hidden on mobile) */}
      <form
        onSubmit={handleSearchSubmit} // Handle search form submit
        className="hidden md:flex items-center bg-white border border-gray-300 rounded-full w-1/2 h-12 px-5 shadow-sm transition duration-200 ease-in-out focus-within:ring-2 focus-within:ring-primary"
      >
        <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search for posts, profiles, or hashtags"
          className="bg-white pl-3 pr-4 py-2 text-base text-gray-700 w-full rounded-full focus:outline-none"
          value={searchQuery} // Bind to state
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
      </form>

      {/* Desktop Navigation Links (hidden on mobile) */}
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

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faTimes : faBars}
            size="lg"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 flex flex-col items-center py-4 space-y-4 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white border border-gray-300 rounded-full w-10/12 h-12 px-5 shadow-sm transition duration-200 ease-in-out focus-within:ring-2 focus-within:ring-primary"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-500 text-lg"
            />
            <input
              type="text"
              placeholder="Search for posts, profiles, or hashtags"
              className="bg-white pl-3 pr-4 py-2 text-base text-gray-700 w-full rounded-full focus:outline-none"
              value={searchQuery} // Bind to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
          </form>

          <a
            href="/messaging"
            className="text-primary text-lg font-medium flex gap-2 items-center"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
            Messages
          </a>

          <button
            onClick={handleProfileClick}
            className="text-white bg-accent py-2 px-6 rounded-full hover:bg-accent-dark transition duration-200 ease-in-out"
          >
            <FontAwesomeIcon icon={faUser} className="text-white mr-2" />
            Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
