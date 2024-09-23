import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5001/api/auth", // Backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
