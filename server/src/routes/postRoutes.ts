import express from "express";
import { createPost, getAllPosts } from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddlleware";

const router = express.Router();

// Create a new post (Protected route)
router.post("/create", authenticate, upload.single("image"), createPost);

// Fetch all posts
router.get("/", getAllPosts);

export default router;
