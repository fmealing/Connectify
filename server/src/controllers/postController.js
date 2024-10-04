const Post = require("../models/Post");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Storage } = require("@google-cloud/storage");

// import Post from "../models/Post";
// import mongoose from "mongoose";
// import { Storage } from "@google-cloud/storage";
// import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Google Cloud Storage instance
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket("connectify-images");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { content, imageUrl, videoUrl } = req.body;
    const userId = req.user?.id; // Assume the user is authenticated

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const newPost = new Post({
      user: new mongoose.Types.ObjectId(userId),
      content,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "fullName profilePicture")
      .populate({
        path: "comments",
        populate: { path: "user", select: "fullName" },
      })
      .exec();

    res.status(200).json(posts || []); // Ensure posts is an array
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

// Get post by id
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post ID
    const post = await Post.findById(postId)
      .populate("user", "fullName profilePicture")
      .populate({
        path: "comments",
        populate: { path: "user", select: "fullName" },
      })
      .exec();

    // If the post doesn't exist, return a 404 error
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return the post
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

// Edit post by id
const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;
    const { content } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the authenticated user is the owner of the post
    if (post.user.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Cannot edit this post" });
    }

    // Update post content
    post.content = content || post.content;

    // Handle image upload if a new image is provided
    let imageUrl = post.imageUrl; // Use existing image if no new image uploaded
    if (req.file) {
      const file = req.file;
      const blob = bucket.file(`${Date.now()}_${file.originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,
      });

      blobStream.on("error", (err) => {
        return res
          .status(500)
          .json({ message: "Error uploading file", error: err.message });
      });

      blobStream.on("finish", async () => {
        // Construct the public URL of the uploaded image
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Update the post's image URL after the file is uploaded
        post.imageUrl = imageUrl;

        // Save the updated post
        const updatedPost = await post.save();
        return res
          .status(200)
          .json({ message: "Post updated", post: updatedPost });
      });

      // Upload the file buffer to GCS
      blobStream.end(file.buffer);
    } else {
      // Save the post without changing the image
      const updatedPost = await post.save();
      return res
        .status(200)
        .json({ message: "Post updated", post: updatedPost });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing post", error: error.message });
  }
};

// Delete post by ID
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id; // Assuming the user is authenticated

    // Find the post by ID
    const post = await Post.findById(postId);

    // If post not found, return 404
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the authenticated user is the owner of the post
    if (post.user.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Cannot delete this post" });
    }

    // Delete the post
    await Post.deleteOne({ _id: postId });

    // Respond with success message
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};
ß;

// Get all posts by user
const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find posts by user ID
    const posts = await Post.find({ user: userId })
      .populate("user", "fullName profilePicture")
      .sort({ createdAt: -1 }) // Sort by latest posts
      .exec();

    // If no posts are found, return a 404 error
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    // Return the posts
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

// Search all posts
const getPosts = async (req, res) => {
  try {
    const { search } = req.query;

    let posts;
    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive search
      posts = await Post.find({ content: { $regex: searchRegex } })
        .populate("user", "fullName profilePicture")
        .populate({
          path: "comments",
          populate: { path: "user", select: "fullName" },
        })
        .exec();
    } else {
      posts = await Post.find()
        .populate("user", "fullName profilePicture")
        .populate({
          path: "comments",
          populate: { path: "user", select: "fullName" },
        })
        .exec();
    }

    res.status(200).json(posts || []);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  getPostsByUser,
  getPosts,
};
