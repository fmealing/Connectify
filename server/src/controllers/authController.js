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
exports.googleLogin = exports.updateUserProfile = exports.getUserProfile = exports.login = exports.signup = void 0;
const storage_1 = require("@google-cloud/storage");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// load the environment variables
dotenv_1.default.config();
const storage = new storage_1.Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket("connectify-images");
// User Registration (Sign Up)
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, username, password } = req.body;
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        const existingUsername = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }
        // Create a new user instance
        const newUser = new User_1.default({
            fullName,
            email,
            username,
            passwordHash: password, // automatically hashed before saving
        });
        // Save the user to the database
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Error registering user", error);
        const err = error;
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
});
exports.signup = signup;
// User Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if the user exists in the database
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Check if the provided password matches the hashed password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Respond with the token
        res.status(200).json({ token });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});
exports.login = login;
// Get User Profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Extract the user id from the request
        // Fetch user details from the database
        const user = yield User_1.default.findById(userId).select("-passwordHash"); // Exclude the password hash from the response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        const err = error;
        res
            .status(500)
            .json({ message: "Error fetching user profile", error: err.message });
    }
});
exports.getUserProfile = getUserProfile;
// Update User Profile
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Again, no need to cast
        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized: User not logged in" });
        }
        let imageUrl = req.body.profilePicture;
        if (req.file) {
            const file = req.file;
            const blob = bucket.file(`${Date.now()}_${file.originalname}`);
            const blobStream = blob.createWriteStream({
                resumable: false,
                gzip: true,
            });
            blobStream.on("error", (err) => {
                console.error("Error uploading file", err);
                return res.status(500).json({ message: "Error uploading file" });
            });
            blobStream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
                imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                const updatedUser = yield User_1.default.findByIdAndUpdate(userId, Object.assign({ profilePicture: imageUrl }, req.body), { new: true, runValidators: true }).select("-passwordHash");
                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(updatedUser);
            }));
            blobStream.end(file.buffer);
        }
        else {
            const updatedUser = yield User_1.default.findByIdAndUpdate(userId, Object.assign({}, req.body), { new: true, runValidators: true }).select("-passwordHash");
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(updatedUser);
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating profile",
            error: error.message,
        });
    }
});
exports.updateUserProfile = updateUserProfile;
// Google Login
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, picture, sub: googleId } = req.body;
    try {
        let user = yield User_1.default.findOne({ $or: [{ email }, { googleId }] });
        if (!user) {
            user = new User_1.default({
                fullName: name,
                email,
                googleId,
                profilePicture: picture,
            });
            yield user.save();
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
});
exports.googleLogin = googleLogin;
