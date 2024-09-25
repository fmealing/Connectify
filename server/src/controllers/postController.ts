import { Request, Response } from "express";
import Post from "../models/Post";

interface AuthenticateRequest extends Request {
  user?: { id: string };
}

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    console.log("User in request: ", (req as any).user);

    const { content, imageUrl, videoUrl } = req.body;
    const userId = (req as any).user.id; // Assume the user is authenticated

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const newPost = new Post({
      user: userId,
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
