import mongoose, { Schema, Document } from "mongoose";

// Define the Comment interface for TypeScript
export interface IComment extends Document {
  post: mongoose.Types.ObjectId; // Post the comment belongs to
  user: mongoose.Types.ObjectId; // User who created the comment
  content: string; // Content of the comment
  parentComment?: mongoose.Types.ObjectId; // Reference to a parent comment (for replies)
  likes: mongoose.Types.ObjectId[]; // Array of users who liked the comment
}

// Create the Comment schema
const CommentSchema: Schema = new Schema(
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

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
