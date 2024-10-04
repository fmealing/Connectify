"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
// Create a new post (Protected route)
router.post("/create", authMiddleware_1.authenticate, postController_1.createPost);
// Get all posts
router.get("/", postController_1.getAllPosts);
// Search all posts
router.get("/search/posts", postController_1.getPosts);
// Get post by id
router.get("/:postId", postController_1.getPostById);
// Edit a specific post (Protected route)
router.put("/:postId", authMiddleware_1.authenticate, imageController_1.imageUploadMiddleware, postController_1.editPost);
// Delete a specific post (Protected route)
router.delete("/:postId", authMiddleware_1.authenticate, postController_1.deletePost);
// Get all posts by a specific user
router.get("/user/:userId", postController_1.getPostsByUser);
exports.default = router;
