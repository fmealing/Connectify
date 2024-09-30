import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import { pusher } from "../app";

export const createConversation = async (req: Request, res: Response) => {
  const { userIds } = req.body;

  try {
    const conversation = new Conversation({ participants: userIds });
    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error creating conversation", error });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { conversationId, senderId, content } = req.body;

  try {
    const message = new Message({
      conversation: conversationId,
      sender: senderId,
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

export const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    }); // Fetch and sort messages by time
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

// Get all conversations of an authenticated user
export const getConversationsById = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // Assuming the user is authenticated

  try {
    // Find conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "username");

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations", error });
  }
};
