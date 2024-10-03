import express from "express";
import {
  createConversation,
  getConversationMessages,
  getConversationsById,
  sendMessage,
} from "../controllers/messageController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new conversation
router.post("/create", createConversation);

// Send a message in a conversation
router.post("/messages", sendMessage);

// Get Conversation Message
router.get("/:conversationId/messages", getConversationMessages);

// Get conversations of an authenticated user
router.get("/", authenticate, getConversationsById);

export default router;
