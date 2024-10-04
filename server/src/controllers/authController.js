import { Storage } from "@google-cloud/storage";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// load the environment variables
dotenv.config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket("connectify-images");

// User Registration (Sign Up)
export const signup = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      username,
      passwordHash: password, // automatically hashed before saving
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.messages });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract the user id from the request

    // Fetch user details from the database
    const user = await User.findById(userId).select("-passwordHash"); // Exclude the password hash from the response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract the user id

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

      blobStream.on("finish", async () => {
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilePicture: imageUrl, ...req.body },
          { new: true, runValidators: true }
        ).select("-passwordHash");

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updatedUser);
      });

      blobStream.end(file.buffer);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...req.body },
        { new: true, runValidators: true }
      ).select("-passwordHash");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  const { email, name, picture, sub: googleId } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { googleId }] });

    if (!user) {
      user = new User({
        fullName: name,
        email,
        googleId,
        profilePicture: picture,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
