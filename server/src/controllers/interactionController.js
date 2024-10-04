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
exports.unlikePost = exports.likePost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
// Like a Post
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Get the authenticated user's ID
        const { postId } = req.body;
        // Check if userId is available
        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized: User not authenticated" });
        }
        const post = yield Post_1.default.findById(postId);
        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Check if the user already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "Post already liked" });
        }
        // Add the user's ID to the likes array
        post.likes.push(userId);
        yield post.save();
        return res.status(200).json({ message: "Post liked successfully", post });
    }
    catch (error) {
        const err = error;
        return res
            .status(500)
            .json({ message: "Error liking post", error: err.message });
    }
});
exports.likePost = likePost;
// Unlike a Post
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Get the authenticated user's ID
        const { postId } = req.body;
        // Check if userId is available
        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized: User not authenticated" });
        }
        const post = yield Post_1.default.findById(postId);
        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Remove the user's ID from the likes array
        post.likes = post.likes.filter((like) => !like.equals(userId));
        yield post.save();
        return res.status(200).json({ message: "Post unliked successfully", post });
    }
    catch (error) {
        const err = error;
        return res
            .status(500)
            .json({ message: "Error unliking post", error: err.message });
    }
});
exports.unlikePost = unlikePost;
