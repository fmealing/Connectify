const dotenv = require("dotenv");
const { Storage } = require("@google-cloud/storage");
const multer = require("multer");

// Load environment variables from a .env file
dotenv.config();

// Initialise Google Cloud Storage instance
const storage = new Storage({
  projectId: "sinuous-city-436905-u6",
  keyFilename: "./sinuous-city-436905-u6-ad4e64da9e61.json", // Direct reference to the credentials file
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

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      // Return success response with the image URL
      res
        .status(200)
        .json({ message: "File uploaded successfully", url: publicUrl });
    });

    blobStream.on("error", (error) => {
      // Handle any error during the upload process
      console.error("Error uploading file:", error);
      res
        .status(500)
        .json({ message: "Error uploading file", error: error.message });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error during upload:", error);
    res
      .status(500)
      .json({ message: "Error processing request", error: error.message });
  }
};

module.exports = {
  uploadImage,
  imageUploadMiddleware: upload.single("image"),
};
