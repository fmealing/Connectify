import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background text-text px-10 py-4 flex justify-between items-center">
      {/* Logo */}
      <a href="/">
        <img
          src="/svg/logo-no-background.svg"
          alt="Connectify Logo"
          className="h-12 m-6"
        />
      </a>

      {/* Search Bar with FontAwesome Magnifying Glass Icon */}
      <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-md w-80 h-12">
        <span className="pl-4">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg" />
        </span>
        <input
          type="text"
          placeholder="Search user"
          className="bg-white pl-3 pr-4 py-2 text-base text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 font-body">
        <li className="h-12 px-4 rounded-md border border-primary justify-center items-center gap-2 inline-flex">
          <a href="/messages" className="flex gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
            <p className="text-center text-primary text-base font-medium font-inter leading-tight">
              Messages
            </p>
          </a>
        </li>
        <li className="h-12 px-4 bg-accent rounded-md justify-center items-center gap-2 inline-flex">
          <a href="/profile" className="flex gap-2">
            <FontAwesomeIcon icon={faUser} className="text-white" />
            <p className="text-center text-white text-base font-medium font-inter leading-tight">
              Profile
            </p>
          </a>
        </li>
      </ul>

      {/* Mobile Menu (optional) */}
      <div className="md:hidden">
        {/* Add hamburger icon for mobile menu */}
      </div>
    </nav>
  );
};

export default Navbar;
