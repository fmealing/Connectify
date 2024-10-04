"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadMiddleware = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("@google-cloud/storage");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize Google Cloud Storage instance
const storage = new storage_1.Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket("connectify-images");
// Set up Multer to handle file uploads temporarily in memory
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const file = req.file;
        const blob = bucket.file(`${Date.now()}_${file.originalname}`);
        const blobStream = blob.createWriteStream({
            resumable: false,
            gzip: true,
        });
        blobStream.on("error", (err) => {
            res
                .status(500)
                .json({ message: "Error uploading file", error: err.message });
        });
        blobStream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
            // Use the blob.name to correctly define the image URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            res
                .status(200)
                .json({ message: "File uploaded successfully", url: publicUrl });
        }));
        blobStream.end(file.buffer); // Upload the image buffer to GCS
    }
    catch (error) {
        console.error("Error during upload: ", error);
        const err = error;
        res
            .status(500)
            .json({ message: "Error processing request", error: err.message });
    }
});
exports.uploadImage = uploadImage;
// Export the multer middleware for use in the routes
exports.imageUploadMiddleware = upload.single("image"); // "image" is the field name in the form
