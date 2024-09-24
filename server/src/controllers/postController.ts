import { Request, Response } from "express";
import Post from "../models/Post";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, hashtags } = req.body;
    const userId = (req as any).user._id;

    // Create a new post with the uploaded image
    const newPost = new Post({
      user: userId,
      image: req.file?.path, // image uploaded using multer
      content,
      hashtags: hashtags.split(",").map((tag: string) => tag.trim()),
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Fetch all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("user", "username").exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
