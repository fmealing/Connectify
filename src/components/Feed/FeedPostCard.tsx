import { faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface FeedPostCardProps {
  imageSrc: string;
  textContent: string;
  date: string;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({
  imageSrc,
  textContent,
  date,
}) => {
  const maxLength = 100;
  const isTextTruncated = textContent.length > maxLength;
  const displayedText = isTextTruncated
    ? textContent.slice(0, maxLength) + "..."
    : textContent;

  // State to manage likes
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="bg-background shadow-md rounded-lg overflow-hidden w-full h-[400px] flex flex-col">
      {/* Post Image */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>

      {/* Post Text */}
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

        {/* Like & Comment Buttons */}
        <div className="flex items-center justify-between">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} size="xl" />
            <span>
              {likesCount} {likesCount == 1 ? "Like" : "Likes"}
            </span>
          </button>

          {/* Comment Button */}
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
            <FontAwesomeIcon icon={faCommentDots} size="xl" />
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPostCard;
