import { Request, Response } from "express";
import User from "../models/User"; // Import the User model

//1. Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    // Extract email and password from the request body
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
    const token = user.generateAuthToken();

    // Respond with the token
    return res.status(200).json({ token });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Error logging in", error });
  }
};

// 1. Signup Controller
export const signup = async (req: Request, res: Response) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Check if a user already exists with the same email or username
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // 2. Create a new user instance
    const newUser = new User({ username, email, password });

    // 3. Save the user in the database
    await newUser.save();

    // Respond with a success message
    return res.status(201).json({ message: "USer registered successfully" });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ message: "Error creating user", error });
  }
};
