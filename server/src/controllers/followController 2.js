"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUser = exports.followUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// Follow a User
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // Current logged-in user
        const { followUserId } = req.body; // User to follow
        if (userId == followUserId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }
        // Find both users
        const user = yield User_1.default.findById(userId);
        const followUser = yield User_1.default.findById(followUserId);
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
        yield user.save();
        // Add userId to followUser's followers array
        followUser.followers.push(userId);
        yield followUser.save();
        return res.status(200).json({ message: "User followed successfully" });
    }
    catch (error) {
        const err = error;
        return res
            .status(500)
            .json({ message: "Error following user", error: err.message });
    }
});
exports.followUser = followUser;
// Unfollow a User
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // Current logged-in user
        const { unfollowUserId } = req.body; // User to unfollow
        if (userId == unfollowUserId) {
            return res.status(400).json({ message: "You cannot unfollow yourself" });
        }
        // Find both users
        const user = yield User_1.default.findById(userId);
        const unfollowUser = yield User_1.default.findById(unfollowUserId);
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
        user.following = user.following.filter((id) => id.toString() !== unfollowUserId);
        yield user.save();
        // Remove userId from unfollowUser's followers array
        unfollowUser.followers = unfollowUser.followers.filter((id) => id.toString() !== userId);
        yield unfollowUser.save();
        return res.status(200).json({ message: "User unfollowed successfully" });
    }
    catch (error) {
        const err = error;
        return res
            .status(500)
            .json({ message: "Error unfollowing user", error: err.message });
    }
});
exports.unfollowUser = unfollowUser;
