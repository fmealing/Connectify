import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ProfileButtons from "../components/Profile/ProfileButtons";
import PostCarousel from "../components/Profile/PostCarousel";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

interface Follower {
  fullName: string;
  profilePicture: string;
  email: string;
}

interface UserProfile {
  fullName: string;
  username: string;
  bio: string;
  profilePicture: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null); // Store user profile
  const [followers, setFollowers] = useState<Follower[]>([]); // Followers state
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // Loading state for fetching posts
  const [error, setError] = useState<string | null>(null); // Error state for fetching posts

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // Decode the token to get the userId
  let userId: string | null = null;
  try {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      userId = decodedToken.id; // Extract the user ID or other info from the decoded token
    }
  } catch (error) {
    console.error("Error decoding token", error);
  }

  // Fetch user profile, posts, and followers when the component loads
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const profileResponse = await axios.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(profileResponse.data); // Set user profile data

        // Fetch posts
        const postsResponse = await axios.get(`/api/posts/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(postsResponse.data); // Set posts data

        // Fetch followers
        const followersResponse = await axios.get(
          `/api/users/${userId}/followers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowers(followersResponse.data.followers); // Set followers data

        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, token]);

  // Update profile details in the backend
  const handleProfileUpdate = async (updatedFields: {
    fullName?: string;
    username?: string;
    bio?: string;
  }) => {
    try {
      if (!profile) return;

      const response = await axios.put(
        `/api/users/profile`,
        { ...profile, ...updatedFields }, // Merge the current profile with updated fields
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data); // Update local state with the updated profile data
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Error updating profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file); // Append the file to the form data

    try {
      const response = await axios.put(`/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(response.data); // Update local state with the updated profile data
    } catch (error) {
      console.error("Error uploading image", error);
      setError("Error uploading image.");
    }
  };

  const handleSaveChanges = () => {
    handleProfileUpdate({
      fullName: profile?.fullName,
      username: profile?.username,
      bio: profile?.bio,
    });
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
          {profile ? (
            <>
              <ProfilePicture
                src={profile.profilePicture}
                alt="Profile"
                onImageUpload={handleImageUpload}
              />
              <ProfileDetails
                name={profile.fullName}
                username={profile.username}
                bio={profile.bio}
                followers={followers.length} // Display followers count
                onUpdate={handleProfileUpdate} // Handle profile updates
              />
              <ProfileButtons onSave={handleSaveChanges} />
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>

      {/* Followers Section */}
      <div className="bg-secondary-light py-8 px-4">
        <h2 className="text-h2 font-heading text-center text-text mb-6">
          Followers
        </h2>
        <hr className="border-t border-text mb-8" />

        {followers.length === 0 ? (
          <p className="text-center text-text">No followers yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {followers.map((follower, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={follower.profilePicture}
                  alt={follower.fullName}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{follower.fullName}</h3>
                <p className="text-sm text-gray-500">{follower.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Posts Section */}
      <div className="w-full mx-0 bg-secondary-light py-8 px-0">
        <h2 className="text-h2 font-heading text-center text-text mb-6">
          My Posts
        </h2>
        <hr className="border-t border-text mb-8" />

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
