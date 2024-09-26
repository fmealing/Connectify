import { Request, Response } from "express";
import Post from "../models/Post";
import mongoose from "mongoose";

interface AuthenticateRequest extends Request {
  user?: { id: string };
}

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, imageUrl, videoUrl } = req.body;
    console.log("Request user id", (req as any).user.id); // TODO: Remove this line
    const userId = (req as any).user.id; // Assume the user is authenticated

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
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("user", "fullName profilePicture") // Populate user details
      .populate({
        path: "comments",
        populate: { path: "user", select: "fullName" }, // Populate comment user details
      })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
};

// Get post by id
export const getPostById = async (req: Request, res: Response) => {
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
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error fetching post", error: err.message });
  }
};

// Edit post by id
export const editPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params; // Get the post ID
    const { content, imageUrl, videoUrl } = req.body; // Get the updated post content
    const userId = (req as any).user.id; // Get the user ID (assuming authenticated user)
    console.log(req.params); // TODO: Remove this line
    console.log(req.body); // TODO: Remove this line
    console.log("Authenticated User ID:", userId); // TODO: Remove this line

    // Find the post by ID
    const post = await Post.findById(postId);

    // If the post doesn't exist return 404
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log(post.user.toString()); // TODO: Remove this line
    // User id (from database): "66f454874ee957dd5291c9cd"
    // UserId from request "66f454874ee957dd5291c9cd"
    // post.user.toString() "66f412b32a018677c032ef61"

    // Check if the authenticated user is the owner of the post
    if (post.user.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Cannot edit this post" });
    }

    // Update the post fields
    if (content) post.content = content;
    if (imageUrl) post.imageUrl = imageUrl;
    if (videoUrl) post.videoUrl = videoUrl;

    // Save the updated post
    const updatedPost = await post.save();

    // Return the updated post in the response
    return res.status(200).json({ message: "Post updated", post: updatedPost });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Error editing post", error: err.message });
  }
};

// Delete post by ID
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = (req as any).user.id; // Assuming the user is authenticated

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
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error deleting post", error: err.message });
  }
};
