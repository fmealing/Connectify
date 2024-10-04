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
exports.getPosts = exports.getPostsByUser = exports.deletePost = exports.editPost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const mongoose_1 = __importDefault(require("mongoose"));
const storage_1 = require("@google-cloud/storage");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize Google Cloud Storage instance
const storage = new storage_1.Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket("connectify-images");
// Create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, imageUrl, videoUrl } = req.body;
        const userId = req.user.id; // Assume the user is authenticated
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }
        const newPost = new Post_1.default({
            user: new mongoose_1.default.Types.ObjectId(userId),
            content,
            imageUrl: imageUrl || null,
            videoUrl: videoUrl || null,
        });
        yield newPost.save();
        res
            .status(201)
            .json({ message: "Post created successfully", post: newPost });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error creating post", error: err.message });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find()
            .populate("user", "fullName profilePicture")
            .populate({
            path: "comments",
            populate: { path: "user", select: "fullName" },
        })
            .exec();
        res.status(200).json(posts || []); // Ensure posts is an array
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching posts", error: err.message });
    }
});
exports.getAllPosts = getAllPosts;
// Get post by id
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        // Find the post ID
        const post = yield Post_1.default.findById(postId)
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
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching post", error: err.message });
    }
});
exports.getPostById = getPostById;
// Edit post by id
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        const { content } = req.body;
        // Find the post by ID
        const post = yield Post_1.default.findById(postId);
        if (!post)
            return res.status(404).json({ message: "Post not found" });
        // Check if the authenticated user is the owner of the post
        if (post.user.toString() !== userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Cannot edit this post" });
        }
        // Update post content
        post.content = content || post.content;
        // Handle image upload if a new image is provided
        let imageUrl = post.imageUrl; // Use existing image if no new image uploaded
        if (req.file) {
            const file = req.file;
            const blob = bucket.file(`${Date.now()}_${file.originalname}`);
            const blobStream = blob.createWriteStream({
                resumable: false,
                gzip: true,
            });
            blobStream.on("error", (err) => {
                return res
                    .status(500)
                    .json({ message: "Error uploading file", error: err.message });
            });
            blobStream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
                // Construct the public URL of the uploaded image
                imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                // Update the post's image URL after the file is uploaded
                post.imageUrl = imageUrl;
                // Save the updated post
                const updatedPost = yield post.save();
                return res
                    .status(200)
                    .json({ message: "Post updated", post: updatedPost });
            }));
            // Upload the file buffer to GCS
            blobStream.end(file.buffer);
        }
        else {
            // Save the post without changing the image
            const updatedPost = yield post.save();
            return res
                .status(200)
                .json({ message: "Post updated", post: updatedPost });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error editing post", error: error.message });
    }
});
exports.editPost = editPost;
// Delete post by ID
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const userId = req.user.id; // Assuming the user is authenticated
        // Find the post by ID
        const post = yield Post_1.default.findById(postId);
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
        yield Post_1.default.deleteOne({ _id: postId });
        // Respond with success message
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error deleting post", error: err.message });
    }
});
exports.deletePost = deletePost;
// Get all posts by user
const getPostsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Find posts by user ID
        const posts = yield Post_1.default.find({ user: userId })
            .populate("user", "fullName profilePicture")
            .sort({ createdAt: -1 }) // Sort by latest posts
            .exec();
        // If no posts are found, return a 404 error
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }
        // Return the posts
        res.status(200).json(posts);
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching posts", error: err.message });
    }
});
exports.getPostsByUser = getPostsByUser;
// Search all posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        let posts;
        if (search) {
            const searchRegex = new RegExp(search, "i"); // Case-insensitive search
            posts = yield Post_1.default.find({ content: { $regex: searchRegex } })
                .populate("user", "fullName profilePicture")
                .populate({
                path: "comments",
                populate: { path: "user", select: "fullName" },
            })
                .exec();
        }
        else {
            posts = yield Post_1.default.find()
                .populate("user", "fullName profilePicture")
                .populate({
                path: "comments",
                populate: { path: "user", select: "fullName" },
            })
                .exec();
        }
        res.status(200).json(posts || []);
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching posts", error: err.message });
    }
});
exports.getPosts = getPosts;
