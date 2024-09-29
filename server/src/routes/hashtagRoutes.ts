import express from "express";
import { searchHastags } from "../controllers/hashtagController";

const router = express.Router();

// Hashtag Search
router.get("/search/hashtags", searchHastags);

export default router;
