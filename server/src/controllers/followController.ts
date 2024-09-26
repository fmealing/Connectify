import { Request, Response } from "express";
import User from "../models/User";

// Follow a User
export const followUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Current logged-in user
    const { followUserId } = req.body; // User to follow

    if (userId == followUserId) {
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
    user.following.push(followUserId);
    await user.save();

    // Add userId to followUser's followers array
    followUser.followers.push(userId);
    await followUser.save();

    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: "Error following user", error: err.message });
  }
};

// Unfollow a User
export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Current logged-in user
    const { unfollowUserId } = req.body; // User to unfollow

    if (userId == unfollowUserId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    // Find both users
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowUserId);

    if (!user || !unfollowUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already following the unfollowUser
    if (!user.following.includes(unfollowUserId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    // Remove unfollowUserId from user's following array
    unfollowUser.followers = unfollowUser.followers.filter(
      (id) => id.toString() !== userId
    );
    await unfollowUser.save();

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: "Error unfollowing user", error: err.message });
  }
};
