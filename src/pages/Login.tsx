import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in...");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side: Form and heading */}
      <div className="flex flex-1 justify-center items-center bg-white px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-h1 font-bold text-center mb-2 font-heading">
              Welcome back to Connectify
            </h1>
            <p className="text-[28px] text-center text-text font-['Playfair']">
              Stay connected with your friends and community
            </p>
          </div>

          {/* Form Section - centered and narrower */}
          <form className="mx-auto max-w-sm" onSubmit={handleLogin}>
            {/* Google Sign-in Button */}
            <button
              type="button"
              className="flex items-center justify-center w-full border border-gray-400 py-2 rounded-md mb-6 hover:bg-gray-100 transition"
            >
              <img
                src="/svg/google-icon.svg" // Use Google icon as an image
                alt="Google"
                className="mr-2 w-5 h-5"
              />
              <span className="text-base font-medium text-gray-700 font-inter leading-tight">
                Login with Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm">
                or Sign in with Email
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input with Eye Icon */}
            <div className="mb-4 relative">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handleTogglePassword}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              />
            </div>

            {/* Sign-in Button */}
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-accent-dark transition"
            >
              <FontAwesomeIcon icon={faKey} className="mr-2" />
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 bg-cover bg-center hidden md:block bg-login">
        {/* div as a Black overlay at 50% opacity */}
        <div className="bg-text bg-opacity-50 h-full" />
      </div>
    </div>
  );
};

export default Login;
