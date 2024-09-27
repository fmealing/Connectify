import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ProfileButtons from "../components/Profile/ProfileButtons";
import PostCarousel from "../components/Profile/PostCarousel";
import axios from "axios"; // Import axios for HTTP requests
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string; // This depends on how your JWT token is structured (usually 'id' or 'sub')
}

const Profile: React.FC = () => {
  const [name, setName] = useState("Florian Mealing");
  const [username, setUsername] = useState("florian_mealing");
  const [bio, setBio] = useState(
    "Passionate about coding and building cool projects."
  );
  const [followers, setFollowers] = useState(69);
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // Loading state for fetching posts
  const [error, setError] = useState<string | null>(null); // Error state for fetching posts

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // Decode the token to get the userId
  let userId: string | null = null;
  try {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token); // Ensure the DecodedToken type matches your JWT payload
      userId = decodedToken.id; // Extract the user ID or other info from the decoded token
    }
  } catch (error) {
    console.error("Error decoding token", error);
  }

  // Fetch posts when the component loads
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/api/posts/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data); // Set posts data
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page min-h-screen">
      {/* Profile Section */}
      <div className="bg-background p-8">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-primary text-white px-4 py-2 rounded-full mb-4 hover:bg-primary-dark transition"
        >
          Logout
        </button>

        <div className="profile-info p-10 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <ProfilePicture src="/images/avatars/avatar-4.jpg" alt="Profile" />
          <ProfileDetails
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            bio={bio}
            setBio={setBio}
            followers={followers}
          />
          <ProfileButtons />
        </div>
      </div>

      {/* My Posts Section (Full Width) */}
      <div className="w-full mx-0 bg-secondary-light py-8 px-0">
        <h2 className="text-h2 font-heading text-center text-text mb-6">
          My Posts
        </h2>
        {/* Optional Separator */}
        <hr className="border-t border-text mb-8" />

        {/* Display posts */}
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <PostCarousel posts={posts} /> // Pass the fetched posts to PostCarousel
        )}
      </div>
    </div>
  );
};

export default Profile;
