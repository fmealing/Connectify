import React from "react";

interface ProfileCardProps {
  avatar: string;
  name: string;
  username: string;
  followers: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatar,
  name,
  username,
  followers,
}) => {
  return (
    <div className="profile-card bg-white p-4 rounded-md shadow-md">
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
