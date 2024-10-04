"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationsById = exports.getConversationMessages = exports.sendMessage = exports.createConversation = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const Message_1 = __importDefault(require("../models/Message"));
const app_1 = require("../app");
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIds } = req.body;
    try {
        // Check if a conversation between these participants already exists
        let conversation = yield Conversation_1.default.findOne({
            participants: { $all: userIds },
        });
        // If conversation doesn't exist, create a new one
        if (!conversation) {
            conversation = new Conversation_1.default({ participants: userIds });
            yield conversation.save();
            yield conversation.populate("participants", "fullName username");
        }
        res.status(201).json(conversation);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating conversation", error });
    }
});
exports.createConversation = createConversation;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, senderId, content } = req.body;
    try {
        const message = new Message_1.default({
            conversation: conversationId,
            sender: senderId,
            content,
        });
        yield message.save();
        // Trigger Pusher event for real-time updates
        app_1.pusher.trigger(`conversation-${conversationId}`, "new-message", {
            message,
        });
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ message: "Error sending message", error });
    }
});
exports.sendMessage = sendMessage;
const getConversationMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversationId } = req.params;
        const messages = yield Message_1.default.find({ conversation: conversationId }).sort({
            createdAt: 1,
        }); // Fetch and sort messages by time
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching messages", error });
    }
});
exports.getConversationMessages = getConversationMessages;
// Get all conversations of an authenticated user
const getConversationsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Access the decoded token from the request
    const userId = (user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user._id);
    if (!userId) {
        return res
            .status(401)
            .json({ message: "Unauthorized. User ID not found." });
    }
    try {
        const conversations = yield Conversation_1.default.find({
            participants: userId,
        }).populate("participants", "fullName username");
        res.status(200).json(conversations);
    }
    catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ message: "Error fetching conversations", error });
    }
});
exports.getConversationsById = getConversationsById;
