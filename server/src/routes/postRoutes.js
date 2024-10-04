const express = require("express");
const {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostById,
  getPosts,
  getPostsByUser,
} = require("../controllers/postController");
const authenticate = require("../middleware/authMiddleware");
const { imageUploadMiddleware } = require("../controllers/imageController");

// import express from "express";
// import {
//   createPost,
//   deletePost,
//   editPost,
//   getAllPosts,
//   getPostById,
//   getPosts,
//   getPostsByUser,
// } from "../controllers/postController";
// import { authenticate } from "../middleware/authMiddleware";
// import { imageUploadMiddleware } from "../controllers/imageController";

const router = express.Router();

// Create a new post (Protected route)
router.post("/create", authenticate, createPost);

// Get all posts
router.get("/", getAllPosts);

// Search all posts
router.get("/search/posts", getPosts);

// Get post by id
router.get("/:postId", getPostById);

// Edit a specific post (Protected route)
router.put("/:postId", authenticate, imageUploadMiddleware, editPost);

// Delete a specific post (Protected route)
router.delete("/:postId", authenticate, deletePost);

// Get all posts by a specific user
router.get("/user/:userId", getPostsByUser);

module.exports = router;
