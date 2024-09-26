import express from "express";
import {
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
} from "../controllers/interactionController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Routes for liking/unliking posts
router.post("/posts/like", authenticate, likePost);
router.post("/posts/unlike", authenticate, unlikePost);

// Routes for liking/unliking comments
router.post("/comments/like", authenticate, likeComment);
router.post("/comments/unlike", authenticate, unlikeComment);

export default router;
