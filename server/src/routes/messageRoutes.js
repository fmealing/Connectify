"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Create a new conversation
router.post("/create", messageController_1.createConversation);
// Send a message in a conversation
router.post("/messages", messageController_1.sendMessage);
// Get Conversation Message
router.get("/:conversationId/messages", messageController_1.getConversationMessages);
// Get conversations of an authenticated user
router.get("/", authMiddleware_1.authenticate, messageController_1.getConversationsById);
exports.default = router;
