const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { pusher } = require("../app");

// import mongoose from "mongoose";
// import Conversation from "../models/Conversation";
// import Message from "../models/Message";
// import { pusher } from "../app";

// Create a new conversation
const createConversation = async (req, res) => {
  const { userIds } = req.body;

  try {
    // Check if a conversation between these participants already exists
    let conversation = await Conversation.findOne({
      participants: { $all: userIds },
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = new Conversation({ participants: userIds });
      await conversation.save();
      await conversation.populate("participants", "fullName username");
    }

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error creating conversation", error });
  }
};

// Send a message in a conversation
const sendMessage = async (req, res) => {
  const { conversationId, senderId, content } = req.body;

  try {
    const message = new Message({
      conversation: new mongoose.Types.ObjectId(conversationId),
      sender: new mongoose.Types.ObjectId(senderId),
      content,
    });
    await message.save();

    // Trigger Pusher event for real-time updates
    pusher.trigger(`conversation-${conversationId}`, "new-message", {
      message,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

// Get messages for a conversation
const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({
      conversation: new mongoose.Types.ObjectId(conversationId),
    }).sort({
      createdAt: 1,
    }); // Fetch and sort messages by time
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

// Get all conversations of an authenticated user
const getConversationsById = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized. User ID not found." });
  }

  try {
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "fullName username");

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Error fetching conversations", error });
  }
};

module.exports = {
  createConversation,
  sendMessage,
  getConversationMessages,
  getConversationsById,
};
