import { Request, Response } from "express";
import Message from "../models/Message";

// Send a new message
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = (req as any).user._id;

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent", messageData: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

// Fetch all messages between two users
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;
    const senderId = (req as any).user._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};
