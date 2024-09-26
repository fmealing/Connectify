import express from "express";
import {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import {
  deleteUser,
  getAllUsers,
  getFollowers,
  getFollowing,
  getUserById,
} from "../controllers/userController";

const router = express.Router();

// Sign up route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Get user profile (protected route)
router.get("/profile", authenticate, getUserProfile);

// Update user profile (protected route)
router.put("/profile", authenticate, updateUserProfile);

// Get all users
router.get("/", getAllUsers);

// Get a single user by ID
router.get("/:userId", getUserById);

// Delete a user by ID (protected route)
router.delete("/:userId", authenticate, deleteUser);

// Fetch all followers of a user
router.get("/:userId/followers", getFollowers);

// Fetch all users that a user is following
router.get("/:userId/following", getFollowing);

export default router;
