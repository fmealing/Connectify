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
    console.log("Decoded user ID", decoded); // This is correct
    (req as any).user = decoded; // Attach the decode token data to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
