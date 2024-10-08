const mongoose = require("mongoose");
const dotenv = require("dotenv");

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

module.exports = {
  connectDB,
};
