import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Send a new message (Protected route)
router.post("/send", authenticate, sendMessage);

// Fetch all messages between two users (Protected route)
router.get("/:receiverId", authenticate, getMessages);

export default router;
