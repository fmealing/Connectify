import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/Post";
import { AuthenticatedRequest } from "../../@types/types";

// Like a Post
export const likePost = async (req, res) => {
  try {
    const userId = req.user?._id; // Get the authenticated user's ID
    const { postId } = req.body;

    // Check if userId is available
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post already liked" });
    }

    // Add the user's ID to the likes array
    post.likes.push(userId);
    await post.save();

    return res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error liking post", error: error.message });
  }
};

// Unlike a Post
export const unlikePost = async (req, res) => {
  try {
    const userId = req.user?._id; // Get the authenticated user's ID
    const { postId } = req.body;

    // Check if userId is available
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter((like) => !like.equals(userId));
    await post.save();

    return res.status(200).json({ message: "Post unliked successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error unliking post", error: error.message });
  }
};
