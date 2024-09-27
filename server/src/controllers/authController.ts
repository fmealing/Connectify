import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

// User Registration (Sign Up)
export const signup = async (req: Request, res: Response) => {
  console.log("Signup request received");
  try {
    const { fullName, email, password, username } = req.body;
    console.log("signup details", { fullName, email, password, username });

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
    console.log("Creating new user: ", newUser);

    // Save the user to the database
    await newUser.save();
    console.log("User registered successfully", newUser);

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
    console.log(email, password);

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
    console.log("Generated JWT token", token);

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
