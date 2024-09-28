import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import User from "../models/User";
import mongoose from "mongoose";

// Start a new conversation
export const createConversation = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;

    if (!participants) {
      return res
        .status(400)
        .json({ message: "A conversation requires at least two participants" });
    }

    const userId = (req as any).user?.id;

    // Find the second user by their username (sent from frontend)
    const secondUser = await User.findOne({ username: participants[0] });
    if (!secondUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the conversation with the authenticated user and the found user
    const newConversation = new Conversation({
      participants: [userId, secondUser._id],
    });

    // Save the conversation to the database
    await newConversation.save();

    res
      .status(201)
      .json({ message: "Conversation created", conversation: newConversation });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error creating conversation", error: err.message });
  }
};

// Send a message in a conversation
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const sender = (req as any).user?.id;

    if (!content) {
      return res.status(400).json({ message: "Message content is required" });
    }

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Check if the sender is part of the conversation
    if (!conversation.participants.includes(sender)) {
      return res
        .status(403)
        .json({ message: "You are not a participant of this conversation" });
    }

    // Create a new message
    const newMessage = new Message({
      conversationId: new mongoose.Types.ObjectId(conversationId),
      sender: new mongoose.Types.ObjectId(sender),
      content,
    });

    await newMessage.save();

    // Update the last message in the conversation with a type cast
    conversation.lastMessage = newMessage._id as mongoose.Types.ObjectId;
    await conversation.save();

    res.status(201).json({ message: "Message sent", messageData: newMessage });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error sending message", error: err.message });
  }
};

// Fetch all messages in a conversation
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = (req as any).user?.id;

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Ensure the user is a participant of the conversation
    if (!conversation.participants.includes(userId)) {
      return res
        .status(403)
        .json({ message: "You are not a participant of this conversation" });
    }

    // Fetch the messages in this conversation
    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    res.status(200).json({ messages });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error fetching messages", error: err.message });
  }
};

// Fetch message for a user
export const listUserConversations = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId((req as any).user?.id);

    // Find conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "fullName profilePicture email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json({ conversations });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error fetching conversations", error: err.message });
  }
};

// Delete a message
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const userId = (req as any).user?.id;

    // Find the message by its ID
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Ensure only the sender or an admin can delete the message
    if (message.sender.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot delete this message" });
    }

    // Remove the message
    await message.deleteOne();

    // Check if the deleted message was the last message in the conversation
    const conversation = await Conversation.findById(message.conversationId);
    if (
      conversation &&
      conversation.lastMessage?.toString() ===
        (message._id as mongoose.Types.ObjectId).toString()
    ) {
      // Find the previous last message in the conversation
      const lastMessage = await Message.findOne({
        conversationId: message.conversationId,
      }).sort({ createdAt: -1 });

      // Update the last message in the conversation
      conversation.lastMessage = lastMessage
        ? (lastMessage._id as mongoose.Types.ObjectId)
        : undefined;
      await conversation.save();
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error deleting message", error: err.message });
  }
};

// Mark as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { conversationId, messageId } = req.params;
    const userId = (req as any).user?.id;

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Find the message in the conversation
    const message = await Message.findOne({ _id: messageId, conversationId });
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Update the message read status
    message.read = true;
    await message.save();

    res
      .status(200)
      .json({ message: "Message marked as read", messageData: message });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error marking message as read", error: err.message });
  }
};
