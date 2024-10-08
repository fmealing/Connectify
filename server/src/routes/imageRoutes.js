const express = require("express");
const {
  imageUploadMiddleware,
  uploadImage,
} = require("../controllers/imageController");

// import express from "express";
// import {
//   imageUploadMiddleware,
//   uploadImage,
// } from "../controllers/imageController";

const router = express.Router();

// Route to upload an image
console.log("Image upload middleware: ", imageUploadMiddleware);
console.log("Upload image: ", uploadImage);
router.post("/upload", imageUploadMiddleware, uploadImage);

module.exports = router; // exports the router module
