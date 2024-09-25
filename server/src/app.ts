import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

// Load environment variables from a .env file
dotenv.config();

// create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI as string;
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Define routes
app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
