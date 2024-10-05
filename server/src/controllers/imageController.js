const dotenv = require("dotenv");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Load environment variables
dotenv.config();

// Decode the base64 string and write to a temporary file
const gcloudCredentialsPath = path.join(__dirname, "gcloud-temp.json");
const base64Credentials = process.env.GCLOUD_CREDENTIALS_BASE64;
fs.writeFileSync(
  gcloudCredentialsPath,
  Buffer.from(base64Credentials, "base64")
);

// Initialize Google Cloud Storage instance with the temp file
const storage = new Storage({
  projectId: "sinuous-city-436905-u6",
  keyFilename: gcloudCredentialsPath, // Use the temp file path
});
const bucket = storage.bucket("connectify-images");

// Set up Multer to handle file uploads temporarily in memory
const upload = multer({ storage: multer.memoryStorage() });

const uploadImage = async (req, res) => {
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

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res
        .status(200)
        .json({ message: "File uploaded successfully", url: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error during upload: ", error);
    res
      .status(500)
      .json({ message: "Error processing request", error: error.message });
  }
};

module.exports = {
  uploadImage,
  imageUploadMiddleware: upload.single("image"),
};
