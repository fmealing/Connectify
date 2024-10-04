"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
// Sign up route
router.post("/signup", authController_1.signup);
// Login route
router.post("/login", authController_1.login);
// Get user profile (protected route)
router.get("/profile", authMiddleware_1.authenticate, authController_1.getUserProfile);
// Update user profile (protected route)
router.put("/profile", authMiddleware_1.authenticate, imageController_1.imageUploadMiddleware, authController_1.updateUserProfile);
// Get all users
router.get("/", userController_1.getAllUsers);
// Search all users
router.get("/search/users", userController_1.getUsers);
// Get a single user by ID
router.get("/:userId", userController_1.getUserById);
// Delete a user by ID (protected route)
router.delete("/:userId", authMiddleware_1.authenticate, userController_1.deleteUser);
// Fetch all followers of a user
router.get("/:userId/followers", userController_1.getFollowers);
// Fetch all users that a user is following
router.get("/:userId/following", userController_1.getFollowing);
// Login with Google
router.post("/google", authController_1.googleLogin);
exports.default = router;
