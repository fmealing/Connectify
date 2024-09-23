import React from "react";

interface PostCardProps {
  imageSrc: string;
  textContent: string;
  date: string;
}

const ProfilePostCard: React.FC<PostCardProps> = ({
  imageSrc,
  textContent,
  date,
}) => {
  const maxLength = 100;
  const isTextTruncated = textContent.length > maxLength;
  const displayedText = isTextTruncated
    ? textContent.slice(0, maxLength) + "..."
    : textContent;

  return (
    <div className="bg-background shadow-md rounded-lg overflow-hidden w-full max-w-sm h-[400px] flex flex-col">
      {/* Post Image */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>

      {/* Post Text & Edit Button */}
      <div className="font-body p-4 flex-1 flex flex-col justify-between">
        {/* Date */}
        <p className="text-sm text-gray-500 mb-2">{date}</p>

        {/* Post Text */}
        <p
          className="text-base text-text mb-4 overflow-hidden text-ellipsis"
          style={{ maxHeight: "120px" }}
        >
          {displayedText}
        </p>

        {/* Edit Button */}
        <button className="bg-accent text-white px-4 py-2 rounded-full hover:bg-accent-dark transition">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProfilePostCard;
