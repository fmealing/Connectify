import express from "express";
import { searchHashtags } from "../controllers/hashtagController";

const router = express.Router();

// Hashtag Search
router.get("/search/hashtags", searchHashtags);

export default router;
