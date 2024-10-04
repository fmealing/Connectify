const express = require("express");
const {
  createComment,
  deleteComment,
  getCommentsByPost,
} = require("../controllers/commentController");
const authenticate = require("../middleware/authMiddleware");

// import express from "express";
// import {
//   createComment,
//   deleteComment,
//   getCommentsByPost,
// } from "../controllers/commentController";
// import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new comment or reply to a comment (Protected route)
router.post("/create", authenticate, createComment);

// Get all comments for a specific post
router.get("/:postId", getCommentsByPost);

// Delete all comments for a specific post (protected route)
router.delete("/:commentId/:postId", authenticate, deleteComment);

module.exports = router;
