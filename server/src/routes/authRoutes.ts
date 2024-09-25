import express from "express";
import {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Sign up route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Get user profile (protected route)
router.get("/profile", authenticate, getUserProfile);

// Update user profile (protected route)
router.put("/profile", authenticate, updateUserProfile);

export default router;
