import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { instance as axios } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Updated OAuth library
import { jwtDecode } from "jwt-decode"; // For decoding the Google token

const clientId =
  "770837864525-occ70gomjga1oln3pp559l3pc8jlmc0o.apps.googleusercontent.com";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("users/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("authToken", token); // Save token to local storage

      setLoading(false);
      navigate("/profile"); // Redirect to a protected route after login
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (response: any) => {
    const { credential } = response;
    const decodedToken: any = jwtDecode(credential);

    try {
      // send the decoded user info to your backend to handle OAuth
      const res = await axios.post("http://localhost:5001/api/users/google", {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        sub: decodedToken.sub, // Google ID
      });

      // Save the token in localStorage and redirect to profile page
      localStorage.setItem("authToken", res.data.token);
      navigate("/profile");
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  };

  // Handle Google Login Failure
  const handleGoogleFailure = (error: any) => {
    console.error("Google Login Failure: ", error);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side: Form and heading */}
      <div className="flex flex-1 justify-center items-center bg-background px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-h1 font-bold text-center mb-2 font-heading text-text">
              Welcome back to Connectify
            </h1>
            <p className="text-[28px] text-center text-text font-['Playfair']">
              Stay connected with your friends and community
            </p>
          </div>

          {/* Form Section - centered and narrower */}
          <form className="mx-auto max-w-sm" onSubmit={handleLogin}>
            {/* Google Sign-in Button */}
            <div className="mb-6">
              <GoogleLogin
                clientId={clientId}
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                render={(renderProps: any) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="flex items-center justify-center w-full py-4 rounded-full border border-text bg-white shadow-md px-6 "
                  >
                    <img
                      src="/svg/google-icon.svg"
                      alt="Google"
                      className="mr-2 w-8 h-8"
                    />
                    <span className="text-base font-medium text-text">
                      Login with Google
                    </span>
                  </button>
                )}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm">
                or Sign in with Email
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Email Input */}
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

            {/* Password Input with Eye Icon */}
            <div className="mb-4 relative">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <a
                  href="/password-reset"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>

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
            </div>

            {/* Sign-in Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-14 w-full bg-accent text-white py-4 px-8 rounded-full flex items-center justify-center transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-accent-dark"
              }`}
            >
              {loading ? (
                <div className="spinner">Loading...</div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faKey} className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-sm font-medium mb-4 text-center">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 bg-cover bg-center hidden md:block bg-login relative">
        <div className="bg-text bg-opacity-50 h-full" />
      </div>
    </div>
  );
};

export default Login;
