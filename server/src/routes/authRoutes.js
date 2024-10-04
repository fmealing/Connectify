const express = require("express");
const {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  googleLogin,
} = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");
const {
  deleteUser,
  getAllUsers,
  getFollowers,
  getFollowing,
  getUserById,
  getUsers,
} = require("../controllers/userController");
const { imageUploadMiddleware } = require("../controllers/imageController");

// import express from "express";
// import {
//   signup,
//   login,
//   getUserProfile,
//   updateUserProfile,
//   googleLogin,
// } from "../controllers/authController";
// import { authenticate } from "../middleware/authMiddleware";
// import {
//   deleteUser,
//   getAllUsers,
//   getFollowers,
//   getFollowing,
//   getUserById,
//   getUsers,
// } from "../controllers/userController";
// import { imageUploadMiddleware } from "../controllers/imageController";

const router = express.Router();

// Sign up route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Get user profile (protected route)
router.get("/profile", authenticate, getUserProfile);

// Update user profile (protected route)
router.put("/profile", authenticate, imageUploadMiddleware, updateUserProfile);

// Get all users
router.get("/", getAllUsers);

// Search all users
router.get("/search/users", getUsers);

// Get a single user by ID
router.get("/:userId", getUserById);

// Delete a user by ID (protected route)
router.delete("/:userId", authenticate, deleteUser);

// Fetch all followers of a user
router.get("/:userId/followers", getFollowers);

// Fetch all users that a user is following
router.get("/:userId/following", getFollowing);

// Login with Google
router.post("/google", googleLogin);

export default router;
