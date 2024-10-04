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
exports.getUsers = exports.getFollowing = exports.getFollowers = exports.deleteUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// Fetch all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all users from the database excluding the passwordHash field
        const users = yield User_1.default.find({}, "-passwordHash");
        res.status(200).json(users);
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching users", error: err.message });
    }
});
exports.getAllUsers = getAllUsers;
// Fetch a specific user's profile by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Fetch the user by ID, excluding sensitive fields like password
        const user = yield User_1.default.findById(userId, "-password");
        // If the user doesn't exist, return a 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return the user's profile
        res.status(200).json(user);
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching user", error: err.message });
    }
});
exports.getUserById = getUserById;
// Delete a user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const authenticatedUserId = req.user.id; // Get the authenticated user ID
        // Only allow the user to delete their own account
        if (authenticatedUserId !== userId) {
            return res
                .status(403)
                .json({ message: "You can only delete your own account" });
        }
        // Find the user by ID
        const user = yield User_1.default.findById(userId);
        // If the user doesn't exist return a 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Delete the user
        yield User_1.default.findByIdAndDelete(userId);
        // Return a success message
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error deleting user", error: err.message });
    }
});
exports.deleteUser = deleteUser;
// Fetch all followers of a specific user
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Find the user ID and populate the 'followers' field
        const user = yield User_1.default.findById(userId).populate("followers", "fullName profilePicture email");
        // If the user doesn't exist, return a 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return the list of followers
        res.status(200).json({ followers: user.followers });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching followers", error: err.message });
    }
});
exports.getFollowers = getFollowers;
// Fetch all users that a specific user is following
const getFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Find the user ID and populate the 'following' field
        const user = yield User_1.default.findById(userId).populate("following", "fullName profilePicture email");
        // If the user doesn't exist, return a 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return the list of users that the user is following
        res.status(200).json({ following: user.following });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching following", error: err.message });
    }
});
exports.getFollowing = getFollowing;
// Search all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        let users;
        if (search) {
            const searchRegex = new RegExp(search, "i");
            users = yield User_1.default.find({
                $or: [
                    { fullName: { $regex: searchRegex } },
                    { username: { $regex: searchRegex } },
                ],
            }).select("-passwordHash");
        }
        else {
            users = yield User_1.default.find({}, "-passwordHash");
        }
        res.status(200).json(users || []);
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching users", error: err.message });
    }
});
exports.getUsers = getUsers;
