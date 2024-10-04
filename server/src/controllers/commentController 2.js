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
exports.deleteComment = exports.getCommentsByPost = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const Post_1 = __importDefault(require("../models/Post"));
// Create a new comment or reply to a comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, content, parentCommentId } = req.body;
        const userId = req.user.id;
        // Check if the post exists
        const post = yield Post_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Create a new comment
        const newComment = new Comment_1.default({
            post: postId,
            user: userId,
            content,
            parentComment: parentCommentId || null,
        });
        // Save the comment to the database
        yield newComment.save();
        // Cast newComment._id to mongoose.Types.ObjectId
        const commentId = newComment._id;
        // Add the comment to the post's comments array
        post.comments.push(commentId);
        yield post.save();
        res
            .status(201)
            .json({ message: "Comment added successfully", comment: newComment });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error adding comment", error: err.message });
    }
});
exports.createComment = createComment;
// get all comments for a specific post
const getCommentsByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params; // get the post id from the request params
        // check if the post exists
        const post = yield Post_1.default.findById(postId).populate({
            path: "comments",
            populate: {
                path: "user",
                select: "fullName profilePicture",
            },
        });
        // if the post does not exist, return a 404 error
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Send back the populated comments
        res.status(200).json({ comments: post.comments });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error getting comments", error: err.message });
    }
});
exports.getCommentsByPost = getCommentsByPost;
// delete a specific comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId, postId } = req.params;
        const userId = req.user.id; // assuming that the user is authenticated
        // find the comment by ID
        const comment = yield Comment_1.default.findById(commentId);
        // if the comment does not exist, return a 404 error
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        // Check if the authenticated user is the owner of the comment
        if (comment.user.toString() !== userId) {
            return res
                .status(403)
                .json({ message: "Unauthorized: Cannot delete this comment" });
        }
        // Delete the comment
        yield comment.deleteOne();
        // Also remove the comment from the post's comments array
        yield Post_1.default.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
        // Respond with a success message
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error deleting comment", error: err.message });
    }
});
exports.deleteComment = deleteComment;
