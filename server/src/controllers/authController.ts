import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import axios from "axios";

// User Registration (Sign Up)
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, username } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser) {
      console.log("User with this email already exists");
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

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Get the authenticated user's ID

    // Update the user's profile information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body }, // Update only the fields provided in the body
      { new: true, runValidators: true }
    ).select("-passwordHash"); // Exclude the password hash from the response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
};

export const requestResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a token and expiration date
    const resetToken = crypto.randomBytes(20).toString("hex");
    const tokenExpiration = Date.now() + 3600000; // 1 hour

    // Save the token and expiration date to the user's document
    (user as any).resetPasswordToken = resetToken;
    (user as any).resetPasswordExpires = tokenExpiration;

    await user.save();

    // Create the reset URL
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    const message = `You have requested a password reset. Please click the following link to reset your password: ${resetUrl}`;

    // Submit the form data to Formspree
    const formData = {
      email: user.email, // Recipient's email
      message, // The email body containing the reset link
    };

    // Formspree endpoint
    const formEndpoint = "https://formspree.io/f/xgvwgkbn";

    await axios.post(formEndpoint, formData);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ message: "Error resetting password", error: err.message });
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
