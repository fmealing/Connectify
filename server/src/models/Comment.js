const mongoose = require("mongoose");
const { Schema } = mongoose;

// import mongoose, { Schema, Document } from "mongoose";

// Create the Comment schema
const CommentSchema = new Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
