import express from "express";
import { createPost, getAllPosts } from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new post (Protected route)
router.post("/create", authenticate, createPost);

// Get all posts
router.get("/", getAllPosts);

export default router;
