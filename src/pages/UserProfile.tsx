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
  following: string[]; // Array of user IDs that this user is following
}

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from the route
  const [userData, setUserData] = useState<UserProfileProps | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfileAndPosts = async () => {
      try {
        // Fetch the user profile
        const userResponse = await axios.get(
          `http://localhost:5001/api/users/${userId}`
        );

        // Fetch the posts for the user
        const postsResponse = await axios.get(
          `http://localhost:5001/api/posts/user/${userId}`
        );

        // Combine user data and posts
        const combinedUserData = {
          ...userResponse.data,
          posts: postsResponse.data, // Add the posts to userData
        };

        // Update state with user data and posts
        setUserData(combinedUserData);

        // Now let's check if the current user (from params) is following this user
        const isFollowingUser = combinedUserData.following.some(
          (followingUserId: string) => followingUserId === userId
        );

        setIsFollowing(isFollowingUser); // Set the isFollowing state
      } catch (error) {
        console.error("Error fetching user profile or posts", error);
      }
    };

    if (userId) {
      fetchUserProfileAndPosts();
    }
  }, [userId]);

  const handleFollowUnfollow = async () => {
    try {
      if (isFollowing) {
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

        setIsFollowing(false);
        if (userData) {
          setUserData({
            ...userData,
            followersCount: userData.followersCount - 1,
          });
        }
      } else {
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
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover"
        />
        <div className="profile-details flex-1">
          <h2 className="text-h2 font-heading">{(userData as any).fullName}</h2>
          <p className="text-sm text-gray-600">@{userData.username}</p>
          <p className="text-sm text-gray-600">
            {(userData as any).followers.length} Followers
          </p>
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
          {(userData as any).fullName}'s Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.posts.map((post, index) => (
            <FeedPostCard
              key={index}
              postId={(post as any)._id} // Ensure your backend returns a post ID
              imageSrc={(post as any).imageUrl}
              content={(post as any).content} // Assuming post.textContent is the post's text
              date={(post as any).createdAt}
              initialLikesCount={(post as any).likesCount || 0} // Modify according to your backend structure
              initiallyLiked={(post as any).isLiked || false} // Modify according to your backend structure
              initialComments={(post as any).comments || []} // Modify according to your backend structure
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
