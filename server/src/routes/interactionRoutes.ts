import express from "express";
import { likePost, unlikePost } from "../controllers/interactionController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Routes for liking/unliking posts
router.post("/posts/like", authenticate, likePost);
router.post("/posts/unlike", authenticate, unlikePost);

export default router;
