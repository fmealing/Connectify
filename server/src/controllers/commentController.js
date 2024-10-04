const Post = require("../models/Post");
const Comment = require("../models/Comment");

// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { AuthenticatedRequest } from "../../@types/types";

// Create a new comment or reply to a comment
const createComment = async (req, res) => {
  try {
    const { postId, content, parentCommentId } = req.body;
    const userId = req.user?._id; // Extract the user id from the request

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

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
    const commentId = newComment._id;

    // Add the comment to the post's comments array
    post.comments.push(commentId);
    await post.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

// get all comments for a specific post
const getCommentsByPost = async (req, res) => {
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
    res
      .status(500)
      .json({ message: "Error getting comments", error: error.message });
  }
};

// delete a specific comment
const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;
    const userId = req.user?._id; // Extract the user id from the request

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    // find the comment by ID
    const comment = await Comment.findById(commentId);

    // if the comment does not exist, return a 404 error
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the authenticated user is the owner of the comment
    if (comment.user.toString() !== userId.toString()) {
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
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  deleteComment,
};
