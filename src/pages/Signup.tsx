import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserPlus,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/auth/signup", {
        email,
        username,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      {/* Left side: Signup Form */}
      <div className="flex flex-1 justify-center items-center px-8">
        <div className="w-full max-w-xl">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-center mb-2 font-['Playfair']">
              Join Connectify Today
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Create your account and start connecting!
            </p>
          </div>

          {/* Form Section */}
          <form className="mx-auto max-w-sm" onSubmit={handleSignup}>
            {/* Email Input with Icon */}
            <div className="mb-4 relative">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-4 text-secondary"
                  size="lg"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-md appearance-none border rounded-full w-full py-4 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium mb-4 text-center">
                  {error}
                </p>
              )}
            </div>

            {/* Username input with Icon */}
            <div className="mb-4 relative">
              <label className="block text-sm font-bold" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="absolute left-4 top-4 text-secondary"
                  size="lg"
                />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="shadow-md appearance-none border rounded-full w-full py-4 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your username"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium mb-4 text-center">
                  {error}
                </p>
              )}
            </div>

            {/* Password Input with Icon */}
            <div className="mb-4 relative">
              <label className="block text-sm font-bold" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-4 text-secondary"
                  size="lg"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-md appearance-none border rounded-full w-full py-4 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={handleTogglePassword}
                  className="absolute right-4 top-4 cursor-pointer text-gray-500"
                  size="lg"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium mb-4 text-center">
                  {error}
                </p>
              )}
            </div>

            {/* Repeat Password Input with Icon */}
            <div className="mb-4 relative">
              <label
                className="block text-sm font-bold"
                htmlFor="repeatPassword"
              >
                Repeat Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-4 text-secondary"
                  size="lg"
                />
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  id="repeatPassword"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="rounded-full shadow-md appearance-none border w-full py-4 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Repeat your password"
                  required
                />
                <FontAwesomeIcon
                  icon={showRepeatPassword ? faEyeSlash : faEye}
                  onClick={handleToggleRepeatPassword}
                  className="absolute right-4 top-4 cursor-pointer text-gray-500"
                  size="lg"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium mb-4 text-center">
                  {error}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <div className="flex justify-center mt-14">
              <button
                type="submit"
                className="h-14 px-6 bg-accent rounded-full flex justify-center items-center gap-2 hover:scale-105 transform transition duration-200"
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="w-6 h-6 text-white"
                />
                <span className="text-white text-lg font-medium font-inter leading-tight">
                  Sign Up Now
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 bg-cover bg-center hidden md:block bg-login relative">
        {/* Optional text overlay */}
        <div className="bg-text bg-opacity-40 absolute inset-0" />
      </div>
    </div>
  );
};

export default Signup;
