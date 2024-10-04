const jwt = require("jsonwebtoken");

// import jwt from "jsonwebtoken";

export const authenticate = (
  req, // Use the extended interface
  res,
  next
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
