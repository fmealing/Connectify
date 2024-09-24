import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic for sending password reset instructions
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      {/* Left side: Text and Form */}
      <div className="flex flex-1 justify-center items-center px-8">
        <div className="w-full max-w-xl">
          {/* Heading */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-h1 font-bold mb-2 font-heading text-text">
              Forgot Your Password?
            </h1>
            <h3 className="text-h3 text-text font-body">
              Enter your email, and we'll send you instructions to reset your
              password.
            </h3>
          </div>

          {/* Form Section */}
          <form onSubmit={handlePasswordReset} className="mx-auto max-w-sm">
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
            </div>

            {/* Reset Password Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="text-white h-14 px-6 bg-accent rounded-full flex justify-center items-center gap-2 hover:scale-105 transform transition duration-200"
              >
                <FontAwesomeIcon
                  icon={faLockOpen}
                  size="lg"
                  className="text-white"
                />
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 bg-cover bg-center hidden md:block bg-password-reset relative">
        <div className="bg-text bg-opacity-50 absolute inset-0" />
      </div>
    </div>
  );
};

export default PasswordReset;
