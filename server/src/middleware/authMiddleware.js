const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from a .env file
dotenv.config();

// import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  console.log("Test");
};
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach the decoded user to the request
//     next();
//   } catch (error) {
//     console.error("JWT verification error:", error); // Log the error for debugging
//     res.status(400).json({ message: "Invalid token", error: error.message });
//   }
// };

module.exports = authenticate;
