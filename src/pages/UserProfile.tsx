import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FeedPostCard from "../components/Feed/FeedPostCard";

interface UserProfileProps {
  name: string;
  username: string;
  followersCount: number;
  isFollowing: boolean;
  profilePicture: string;
  posts: { imageSrc: string; textContent: string; date: string }[];
}

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from the route
  const [userData, setUserData] = useState<UserProfileProps | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}`
        );
        console.log(response.data); // Check the response here
        setUserData(response.data);
        setIsFollowing(response.data.isFollowing); // Set the initial follow state
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleFollowUnfollow = async () => {
    try {
      if (isFollowing) {
        // Unfollow user (you may implement an unfollow route)
        await axios.post(
          "http://localhost:5001/api/follow/unfollow",
          {
            followUserId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the token
            },
          }
        );

        // Update UI after unfollowing
        setIsFollowing(false);
        if (userData) {
          setUserData({
            ...userData,
            followersCount: userData.followersCount - 1,
          });
        }
      } else {
        // Follow user
        await axios.post(
          "http://localhost:5001/api/follow/follow",
          {
            followUserId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the token
            },
          }
        );

        // Update UI after following
        setIsFollowing(true);
        if (userData) {
          setUserData({
            ...userData,
            followersCount: userData.followersCount + 1,
          });
        }
      }
    } catch (error) {
      console.error("Error following/unfollowing user", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page bg-background min-h-screen p-8">
      {/* Profile Info */}
      <div className="profile-info bg-white shadow-md rounded-lg p-10 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Picture */}
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover"
        />

        {/* Profile Details */}
        <div className="profile-details flex-1">
          <h2 className="text-h2 font-heading">{userData.fullName}</h2>
          <p className="text-sm text-gray-600">@{userData.username}</p>
          <p className="text-sm text-gray-600">
            {userData.followersCount} Followers
          </p>

          {/* Follow/Unfollow Button */}
          <button
            onClick={handleFollowUnfollow}
            className={`mt-4 px-6 py-2 rounded-full transition ${
              isFollowing ? "bg-red-500 text-white" : "bg-primary text-white"
            } hover:opacity-90`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>

      {/* User Posts */}
      <div className="my-5">
        <h2 className="text-h2 font-heading text-center text-primary mb-6">
          {userData.fullName}'s Posts
        </h2>

        {/* Grid Layout for User Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.posts.map((post, index) => (
            <FeedPostCard
              key={index}
              imageSrc={post.imageSrc}
              content={post.textContent}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
