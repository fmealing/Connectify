import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import { AuthenticatedRequest } from "../../@types/types";
import { IUser } from "../models/User";

// Follow a User
export const followUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId: mongoose.Types.ObjectId | undefined = req.user?._id; // Current logged-in user's ObjectId

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const { followUserId } = req.body; // User to follow

    if (userId.equals(followUserId)) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Find both users
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);

    if (!user || !followUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already following the followUser
    if (user.following.includes(followUserId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    // Add followUserId to user's following array
    user.following.push(new mongoose.Types.ObjectId(followUserId));
    await user.save();

    // Add userId to followUser's followers array
    followUser.followers.push(userId);
    await followUser.save();

    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error following user",
      error: (error as Error).message,
    });
  }
};

// Unfollow a User
export const unfollowUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId: mongoose.Types.ObjectId | undefined = req.user?._id; // Current logged-in user's ObjectId

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const { unfollowUserId } = req.body; // User to unfollow

    if (userId.equals(new mongoose.Types.ObjectId(unfollowUserId))) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    // Find both users
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowUserId);

    if (!user || !unfollowUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already following the unfollowUser
    if (!user.following.includes(new mongoose.Types.ObjectId(unfollowUserId))) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    // Remove unfollowUserId from user's following array
    user.following = user.following.filter(
      (id) => id.toString() !== unfollowUserId
    );
    await user.save();

    // Remove userId from unfollowUser's followers array
    unfollowUser.followers = unfollowUser.followers.filter(
      (id) => id.toString() !== userId.toString()
    );
    await unfollowUser.save();

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error unfollowing user",
      error: (error as Error).message,
    });
  }
};
