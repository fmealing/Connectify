import mongoose, { Schema, Document } from "mongoose";

// Define the Post interface for TypeScript
export interface IPost extends Document {
  user: mongoose.Types.ObjectId; // User who created the post
  content: string; // Text content of the post
  imageUrl?: string; // Optional image URL
  videoUrl?: string; // Optional video URL
  comments: mongoose.Types.ObjectId[]; // Array of comment IDs
  likes: mongoose.Types.ObjectId[]; // Array of users who liked the post
}

// Create the Post schema
const PostSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, default: null },
    videoUrl: { type: String, default: null },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
