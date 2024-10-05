const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Pusher = require("pusher");
const helmet = require("helmet");
const compression = require("compression");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const followRoutes = require("./routes/followRoutes");
const messageRoutes = require("./routes/messageRoutes");
const imageRoutes = require("./routes/imageRoutes");

// Load environment variables from a .env file
dotenv.config();

// Ensure required environment variables are set
const requiredEnvVars = [
  "MONGO_URI",
  "PUSHER_APP_ID",
  "PUSHER_KEY",
  "PUSHER_SECRET",
  "PUSHER_CLUSTER",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Error: Missing required environment variable ${envVar}`);
    process.exit(1);
  }
});

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Limit payload size
app.use(helmet()); // Security headers
app.use(compression()); // GZIP compression

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});
module.exports.pusher = pusher;

// Define routes
app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/conversations", messageRoutes);
app.use("/api/images", imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
  next();
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
