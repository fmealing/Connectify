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
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">@{username}</p>
        <p className="text-sm text-gray-500">{followers} Followers</p>
      </div>
    </div>
  );
};

export default ProfileCard;
