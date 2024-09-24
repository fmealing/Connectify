import React, { useState } from "react";
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
  const [isFollowing, setIsFollowing] = useState(false);

  const userData: UserProfileProps = {
    name: "John Doe",
    username: "john_doe",
    followersCount: 120,
    isFollowing: false,
    profilePicture: "/images/avatars/avatar-5.jpg",
    posts: [
      {
        imageSrc: "images/posts/post-1.jpg",
        textContent: "First post on my profile!",
        date: "24-09-2024",
      },
      {
        imageSrc: "images/posts/post-2.jpg",
        textContent: "Loving the new updates!",
        date: "25-09-2024",
      },
    ],
  };

  const handleFollowUnfollow = () => {
    setIsFollowing(!isFollowing);
  };

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
          <h2 className="text-h2 font-heading">{userData.name}</h2>
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
          {userData.name}'s Posts
        </h2>

        {/* Grid Layout for User Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.posts.map((post, index) => (
            <FeedPostCard
              key={index}
              imageSrc={post.imageSrc}
              textContent={post.textContent}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
