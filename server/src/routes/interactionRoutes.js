const express = require("express");
const {
  likePost,
  unlikePost,
} = require("../controllers/interactionController");
const authenticate = require("../middleware/authMiddleware");

// import express from "express";
// import { likePost, unlikePost } from "../controllers/interactionController";
// import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Routes for liking/unliking posts
router.post("/posts/like", authenticate, likePost);
router.post("/posts/unlike", authenticate, unlikePost);

module.exports = router;
