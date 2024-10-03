import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FeedPostCard from "../components/Feed/FeedPostCard";
import { jwtDecode } from "jwt-decode";

// Define the structure of user posts
interface PostProps {
  _id: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

// Define the structure of user profile data
interface UserProfileProps {
  fullName: string;
  username: string;
  followersCount: number;
  profilePicture: string;
  followers: string[]; // Store followers as an array of user IDs
  posts: PostProps[];
  following: string[];
}

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserProfileProps | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Ensure jwtDecode is correctly typed
      const decodedToken: { id: string } = jwtDecode(token);
      setLoggedInUserId(decodedToken.id);
    }

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
        const combinedUserData: UserProfileProps = {
          ...userResponse.data,
          posts: postsResponse.data, // Add the posts to userData
        };

        setUserData(combinedUserData);

        // Check if the logged-in user is following this profile user
        if (
          loggedInUserId &&
          combinedUserData.followers.includes(loggedInUserId)
        ) {
          setIsFollowing(true); // Set to true if the user is already following
        }
      } catch (error) {
        console.error("Error fetching user profile or posts", error);
      }
    };

    if (userId) {
      fetchUserProfileAndPosts();
    }
  }, [userId, loggedInUserId]);

  const handleFollowUnfollow = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const url = isFollowing
        ? "http://localhost:5001/api/follow/unfollow"
        : "http://localhost:5001/api/follow/follow";

      const data = isFollowing
        ? { unfollowUserId: userId } // When unfollowing, send unfollowUserId
        : { followUserId: userId }; // When following, send followUserId

      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI based on follow/unfollow action
      if (userData) {
        setUserData({
          ...userData,
          followersCount: isFollowing
            ? userData.followersCount - 1
            : userData.followersCount + 1,
        });
      }

      setIsFollowing(!isFollowing);
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
          <h2 className="text-h2 font-heading">{userData.fullName}</h2>
          <p className="text-sm text-gray-600">@{userData.username}</p>
          <p className="text-sm text-gray-600">
            {userData.followersCount} Followers
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
          {userData.fullName}'s Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.posts.map((post) => (
            <FeedPostCard
              key={post._id}
              postId={post._id}
              imageSrc={post.imageUrl}
              content={post.content}
              date={post.createdAt}
              initialLikesCount={0}
              initiallyLiked={false}
              initialComments={[]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
