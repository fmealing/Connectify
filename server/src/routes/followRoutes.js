const express = require("express");
const { followUser, unfollowUser } = require("../controllers/followController");
const { authenticate } = require("../middleware/authMiddleware");

// import express from "express";
// import { followUser, unfollowUser } from "../controllers/followController";
// import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Follow a user
router.post("/follow", authenticate, followUser);

// Unfollow a user
router.post("/unfollow", authenticate, unfollowUser);

export default router; // exports the router object
