"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Create a new comment or reply to a comment (Protected route)
router.post("/create", authMiddleware_1.authenticate, commentController_1.createComment);
// Get all comments for a specific post
router.get("/:postId", commentController_1.getCommentsByPost);
// Delete all comments for a specific post (protected route)
router.delete("/:commentId/:postId", authMiddleware_1.authenticate, commentController_1.deleteComment);
exports.default = router;
