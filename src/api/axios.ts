import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5001/api", // Backend API base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});
