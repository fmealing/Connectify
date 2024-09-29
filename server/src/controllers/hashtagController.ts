import { Request, Response } from "express";
import Post from "../models/Post";

// Hashtag Search
export const searchHastags = async (req: Request, res: Response) => {
  try {
    const { search } = req.query; // Extract search query
    const searchRegex = new RegExp(search as string, "i"); // Case-insensitive search

    const hashtags = await Post.aggregate([
      { $match: { textContent: { $regex: searchRegex } } },
      { $unwind: "$hashtags" },
      { $group: { _id: "$hashtags", postCount: { $sum: 1 } } },
      { $sort: { postCount: -1 } },
    ]);

    res.status(200).json(hashtags);
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error fetching hashtags", error: err.message });
  }
};
