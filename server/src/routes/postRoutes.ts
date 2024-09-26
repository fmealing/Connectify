import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostById,
} from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new post (Protected route)
router.post("/create", authenticate, createPost);

// Get all posts
router.get("/", getAllPosts);

// Get post by id
router.get("/:postId", getPostById);

// Edit a specific post (Protected route)
router.put("/:postId", authenticate, editPost);

// Delete a specific post (Protected route)
router.delete("/:postId", authenticate, deletePost);

export default router;
