const dotenv = require("dotenv");
const { Storage } = require("@google-cloud/storage");
const multer = require("multer");

// Load environment variables
dotenv.config();

// Initialize Google Cloud Storage instance
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
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
      // Use the blob.name to correctly define the image URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      res
        .status(200)
        .json({ message: "File uploaded successfully", url: publicUrl });
    });

    blobStream.end(file.buffer); // Upload the image buffer to GCS
  } catch (error) {
    console.error("Error during upload: ", error);
    res
      .status(500)
      .json({ message: "Error processing request", error: error.message });
  }
};

// Export the multer middleware and uploadImage function for use in the routes
module.exports = {
  uploadImage,
  imageUploadMiddleware: upload.single("image"), // "image" is the field name in the form
};
