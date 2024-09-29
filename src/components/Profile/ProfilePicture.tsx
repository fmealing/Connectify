import React, { useRef } from "react";

interface ProfilePictureProps {
  src: string;
  alt: string;
  onImageUpload: (file: File) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  alt,
  onImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle the click on the "Edit" button to trigger file input click
  const handleEditClick = () => {
    console.log("Edit clicked, triggering file input...");
    fileInputRef.current?.click();
  };

  // Handle file selection and call the onImageUpload prop
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log("Selected file: ", event.target.files[0]);
      onImageUpload(event.target.files[0]);
    }
  };

  return (
    <div className="profile-picture relative hover:scale-105 transform transition duration-300 ease-in-out">
      <img
        src={src}
        alt={alt}
        className="w-48 h-48 rounded-full object-cover shadow-lg"
      />
      <div
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-white py-2 rounded-b-full cursor-pointer"
        onClick={handleEditClick}
      >
        Edit
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        accept="image/*"
      />
    </div>
  );
};

export default ProfilePicture;
