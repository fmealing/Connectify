// Import axios for making HTTP requests
import axios from "axios";

// Create an Axios instance with a pre-configured base URL and headers
export const instance = axios.create({
  baseURL: "http://localhost:5001/api", // Replace with production URL when deploying
  headers: {
    "Content-Type": "application/json", // Ensure the content is sent in JSON format
    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include user's auth token for authorization
  },
});

// The instance can be used for all API requests to ensure consistent configuration across the app.
