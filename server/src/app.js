"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const interactionRoutes_1 = __importDefault(require("./routes/interactionRoutes"));
const followRoutes_1 = __importDefault(require("./routes/followRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const pusher_1 = __importDefault(require("pusher"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
// Load environment variables from a .env file
dotenv_1.default.config();
// create express app
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10kb" })); // Limit payload size
app.use((0, helmet_1.default)()); // Security headers
app.use((0, compression_1.default)()); // GZIP compression
// MongoDB connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
// Pusher
exports.pusher = new pusher_1.default({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});
// Define routes
app.use("/api/users", authRoutes_1.default);
app.use("/api/posts", postRoutes_1.default);
app.use("/api/comments", commentRoutes_1.default);
app.use("/api/interactions", interactionRoutes_1.default);
app.use("/api/follow", followRoutes_1.default);
// The error is here
console.log("Message Routes: ", messageRoutes_1.default);
app.use("/api/conversations", messageRoutes_1.default);
app.use("/api/images", imageRoutes_1.default);
// Serve static files from the React app
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
// Catch-all route to serve React app
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/build/index.html"));
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: process.env.NODE_ENV === "development"
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
