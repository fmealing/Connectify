import express from "express";
import {
  imageUploadMiddleware,
  uploadImage,
} from "../controllers/imageController";

const router = express.Router();

// Route to upload an image
router.post("/upload", imageUploadMiddleware, uploadImage);

export default router;
