import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../../@types/types";

export const authenticate = (
  req: AuthenticatedRequest, // Use the extended interface
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.user = decoded; // Attach the decoded user to the request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
