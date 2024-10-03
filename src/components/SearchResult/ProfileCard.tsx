import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  userId: string;
  avatar: string;
  name: string;
  username: string;
  followersCount: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  userId,
  avatar,
  name,
  username,
  followersCount,
}) => {
  const [followers, setFollowers] = useState(followersCount);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch followers count from API using the userId
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}/followers`
        );
        setFollowers(response.data.followers.length); // Set followers count from API
      } catch (error) {
        console.error("Error fetching followers", error);
      }
    };

    fetchFollowers();
  }, [userId]);

  // Redirect to the user profile on card click
  const handleCardClick = () => {
    navigate(`/user-profile/${userId}`); // Redirect to user profile with userId
  };

  return (
    <div
      className="profile-card bg-white p-4 rounded-md shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <img src={avatar} alt={name} className="w-16 h-16 rounded-full mb-4" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-500">@{username}</p>
      <p className="text-gray-700">
        {followers > 0 ? followers : "0"} followers
      </p>
    </div>
  );
};

export default ProfileCard;
