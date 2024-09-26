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

// get all comments for a specific post
export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params; // get the post id from the request params

    // check if the post exists
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "fullName profilePicture",
      },
    });

    // if the post does not exist, return a 404 error
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Send back the populated comments
    res.status(200).json({ comments: post.comments });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error getting comments", error: err.message });
  }
};

// delete a specific comment
export const deleteComment = async (
  req: AuthenticateRequest,
  res: Response
) => {
  try {
    const { commentId, postId } = req.params;
    const userId = (req as any).user.id; // assuming that the user is authenticated

    // find the comment by ID
    const comment = await Comment.findById(commentId);

    // if the comment does not exist, return a 404 error
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the authenticated user is the owner of the comment
    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Cannot delete this comment" });
    }

    // Delete the comment
    await comment.deleteOne();

    // Also remove the comment from the post's comments array
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    // Respond with a success message
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error deleting comment", error: err.message });
  }
};
