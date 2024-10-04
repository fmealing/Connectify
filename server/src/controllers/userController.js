import User from "../models/User";

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database excluding the passwordHash field
    const users = await User.find({}, "-passwordHash");

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Fetch a specific user's profile by ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user by ID, excluding sensitive fields like password
    const user = await User.findById(userId, "-password");

    // If the user doesn't exist, return a 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's profile
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const authenticatedUserId = req.user?.id; // Get the authenticated user ID

    // Only allow the user to delete their own account
    if (authenticatedUserId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own account" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // If the user doesn't exist return a 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Return a success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Fetch all followers of a specific user
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user ID and populate the 'followers' field
    const user = await User.findById(userId).populate(
      "followers",
      "fullName profilePicture email"
    );

    // If the user doesn't exist, return a 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the list of followers
    res.status(200).json({ followers: user.followers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching followers", error: error.message });
  }
};

// Fetch all users that a specific user is following
export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user ID and populate the 'following' field
    const user = await User.findById(userId).populate(
      "following",
      "fullName profilePicture email"
    );

    // If the user doesn't exist, return a 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the list of users that the user is following
    res.status(200).json({ following: user.following });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching following", error: error.message });
  }
};

// Search all users
export const getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let users;
    if (search) {
      const searchRegex = new RegExp(search, "i");
      users = await User.find({
        $or: [
          { fullName: { $regex: searchRegex } },
          { username: { $regex: searchRegex } },
        ],
      }).select("-passwordHash");
    } else {
      users = await User.find({}, "-passwordHash");
    }

    res.status(200).json(users || []);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
