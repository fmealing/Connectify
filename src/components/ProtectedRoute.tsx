import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken"); // Check if JWT token is stored

  return token ? <>{children}</> : <Navigate to="/login" />; // Redirect to login if token is not found
};

export default ProtectedRoute;
