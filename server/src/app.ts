import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import interactionRoutes from "./routes/interactionRoutes";
import followRoutes from "./routes/followRoutes";
import messageRoutes from "./routes/messageRoutes";
import imageRoutes from "./routes/imageRoutes";
import Pusher from "pusher";
import helmet from "helmet";
import compression from "compression";
import { Request, Response, NextFunction } from "express";

// Load environment variables from a .env file
dotenv.config();

// create express app
const app = express();

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

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" })); // Limit payload size
app.use(helmet()); // Security headers
app.use(compression()); // GZIP compression

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Pusher
export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
});

// Define routes
app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/conversations", messageRoutes);
app.use("/api/images", imageRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all route to serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
