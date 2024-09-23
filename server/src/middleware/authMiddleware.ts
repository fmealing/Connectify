import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware function to verify JWT token
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get the token from the request header (commonly called 'Authorization')
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // 2. Check if the token exists\
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    // 3. Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // 4. Attach the decoded user data to the request object (req.user)
    (req as any).user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
