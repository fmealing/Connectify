import express from "express";
import {
  createConversation,
  sendMessage,
  getMessages,
  listUserConversations,
  deleteMessage,
  markAsRead,
} from "../controllers/messageController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Start a new conversation
router.post("/", authenticate, createConversation);

// Send a message in a conversation
router.post("/:conversationId/messages", authenticate, sendMessage);

// Get all messages in a conversation
router.get("/:conversationId/messages", authenticate, getMessages);

// List all conversations for an authenticated user
router.get("/", authenticate, listUserConversations);

// Delete a message
router.delete("/messages/:messageId", authenticate, deleteMessage);

// Mark a conversation as read
router.post(
  "/:conversationId/messages/:messageId/read",
  authenticate,
  markAsRead
);

export default router;
