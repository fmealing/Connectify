import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }

  // Decode the token to check its validity
  try {
    const decodedToken: any = jwtDecode(token); // jwtDecode returns the payload of the token

    // Check if the token has expired by comparing the exp time with the current time
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      // Token has expired, remove it from localStorage and redirect
      localStorage.removeItem("authToken");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    // In case of invalid token, remove it and redirect
    localStorage.removeItem("authToken");
    return <Navigate to="/login" />;
  }

  // If the token is valid, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
