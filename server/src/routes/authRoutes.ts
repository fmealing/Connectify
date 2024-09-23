import express from "express";
import { signup, login } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
// Create a new router instance
const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Protected route
router.get("/profile", authenticate, (req, res) => {
  // Access the user from the request object
  const user = (req as any).user;
  res.json({ message: `Welcome to your profile, ${user.email}` });
});

export default router;
