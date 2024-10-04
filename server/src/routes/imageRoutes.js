"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
// Route to upload an image
router.post("/upload", imageController_1.imageUploadMiddleware, imageController_1.uploadImage);
exports.default = router;
