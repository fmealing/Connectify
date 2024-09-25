import express from "express";
import { createComment } from "../controllers/commentController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new comment or reply to a comment (Protected route)
router.post("/create", authenticate, createComment);

export default router;
