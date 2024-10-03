import React from "react";

interface ProfileDetailsProps {
  name: string;
  username: string;
  bio: string;
  followers: number;
  onUpdate: (updatedFields: {
    fullName?: string;
    username?: string;
    bio?: string;
  }) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  name,
  username,
  bio,
  followers,
  onUpdate,
}) => {
  const handleUpdate = (field: string, value: string) => {
    if (field === "fullName") {
      onUpdate({ fullName: value });
    } else if (field === "username") {
      onUpdate({ username: value });
    } else if (field === "bio") {
      onUpdate({ bio: value });
    }
  };

  return (
    <div className="profile-details flex-1">
      {/* Name */}
      <div className="mb-6">
        <label className="font-body text-text block text-sm font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleUpdate("fullName", e.target.value)} // Use onChange for real-time updates
          className="font-body text-text w-full md:w-3/4 border rounded-full px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>

      {/* Username */}
      <div className="mb-6">
        <label className="font-body text-text block text-sm font-semibold mb-2">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => handleUpdate("username", e.target.value)} // Use onChange
          className="font-body text-text w-full md:w-3/4 border rounded-full px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="font-body text-text block text-sm font-semibold mb-2">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => handleUpdate("bio", e.target.value)} // Use onChange
          className="font-body text-text w-full md:w-3/4 border rounded-lg px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
          rows={3}
        />
      </div>

      {/* Follower Count */}
      <div className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-800">
        <div className="bg-primary text-white rounded-full w-8 h-8 flex justify-center items-center shadow-md">
          <span className="font-bold">{followers}</span>
        </div>
        <span className="font-body text-text">Followers</span>
      </div>
    </div>
  );
};

export default ProfileDetails;
