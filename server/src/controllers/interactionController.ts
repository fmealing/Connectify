import { Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";

// Like a Post
export const likePost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { postId } = req.body;

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
    const err = error as Error;
    return res
      .status(500)
      .json({ message: "Error liking post", error: err.message });
  }
};

// Unlike a Post
export const unlikePost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { postId } = req.body;

    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter((like) => like.toString() !== userId);
    await post.save();

    return res.status(200).json({ message: "Post unliked successfully", post });
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: "Error unliking post", error: err.message });
  }
};
