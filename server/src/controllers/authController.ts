import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import User from "../models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import axios from "axios";
import dotenv from "dotenv";

// load the environment variables
dotenv.config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket("connectify-images");

// User Registration (Sign Up)
export const signup = async (req: Request, res: Response) => {
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
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

// User Login
export const login = async (req: Request, res: Response) => {
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
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Extract the user id from the request

    // Fetch user details from the database
    const user = await User.findById(userId).select("-passwordHash"); // Exclude the password hash from the response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: err.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // Get the authenticated user's ID

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    let imageUrl = req.body.profilePicture;

    // Check if a file is present in the request
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
        // Construct the public URL of the uploaded image
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Update the user's profile picture after the file is uploaded
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

      blobStream.end(file.buffer); // Upload the file
    } else {
      // Handle profile updates without file upload
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...req.body },
        { new: true, runValidators: true }
      ).select("-passwordHash");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser); // Respond with the updated user
    }
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    // Find the user by the reset token and check if the token is still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password and save it
    const salt = await bcrypt.genSalt(10);
    (user as any).password = await bcrypt.hash(newPassword, salt);
    (user as any).resetPasswordToken = undefined;
    (user as any).resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error resetting password", error: err.message });
  }
};

// Google Login
export const googleLogin = async (req: Request, res: Response) => {
  const { email, name, picture, sub: googleId } = req.body; // Google payload

  try {
    // Find user by Google Id or email
    let user = await User.findOne({ $or: [{ email }, { googleId }] });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        fullName: name,
        email,
        googleId,
        profilePicture: picture,
      });

      await user.save();
    }

    // Generate a JWT token (Replace with your actual JWT generation method)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
