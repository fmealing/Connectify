import React from "react";

const ProfilePicture: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  return (
    <div className="profile-picture relative hover:scale-105 transform transition duration-300 ease-in-out">
      <img
        src={src}
        alt={alt}
        className="w-48 h-48 rounded-full object-cover shadow-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-white py-2 rounded-b-full">
        Edit
      </div>
    </div>
  );
};

export default ProfilePicture;
