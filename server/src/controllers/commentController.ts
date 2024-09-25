import { Request, Response } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment";
import Post from "../models/Post";

// Extend the Request interface to include user
interface AuthenticateRequest extends Request {
  user?: { _id: string };
}

// Create a new comment or reply to a comment
export const createComment = async (
  req: AuthenticateRequest,
  res: Response
) => {
  try {
    const { postId, content, parentCommentId } = req.body;
    const userId = (req as any).user.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment
    const newComment = new Comment({
      post: postId,
      user: userId,
      content,
      parentComment: parentCommentId || null,
    });

    // Save the comment to the database
    await newComment.save();

    // Cast newComment._id to mongoose.Types.ObjectId
    const commentId = newComment._id as mongoose.Types.ObjectId;

    // Add the comment to the post's comments array
    post.comments.push(commentId);
    await post.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error adding comment", error: err.message });
  }
};
