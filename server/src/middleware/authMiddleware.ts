import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// JWT Authentication Middleware
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    (req as any).user = decoded; // Attach the decoded token (with user info) to the request object

    // Ensure the `user` object contains the `id`
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};
