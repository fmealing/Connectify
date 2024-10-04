const mongoose = require("mongoose");
const { Schema } = mongoose;

// import mongoose, { Schema } from "mongoose";

// Create the Post schema
const PostSchema = new Schema(
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

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
