import React, { useState } from "react";
import { faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

interface FeedPostCardProps {
  postId: string; // Pass the postId to identify the post
  imageSrc?: string;
  textContent: string;
  date: string; // ISO date string
  initialLikesCount: number; // Initialize the number of likes
  initiallyLiked: boolean; // Determine if the post is already liked
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({
  postId,
  imageSrc,
  textContent,
  date,
  initialLikesCount,
  initiallyLiked,
}) => {
  const maxLength = 100;
  const isTextTruncated = textContent.length > maxLength;
  const displayedText = isTextTruncated
    ? textContent.slice(0, maxLength) + "..."
    : textContent;

  const [liked, setLiked] = useState(initiallyLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLike = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (liked) {
        // Unlike post
        await axios.post(
          "http://localhost:5001/api/interactions/posts/unlike",
          { postId }, // Request body
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Pass the token in headers
            },
          }
        );
        setLikesCount((prevCount) => prevCount - 1);
      } else {
        // Like post
        await axios.post(
          "http://localhost:5001/api/interactions/posts/like",
          { postId }, // Request body
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Pass the token in headers
            },
          }
        );
        setLikesCount((prevCount) => prevCount + 1);
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking post", error);
    }
  };

  // Format the date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background shadow-md rounded-lg overflow-hidden w-full h-[400px] flex flex-col">
      {imageSrc ? (
        <div
          className="w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div className="font-body p-4 flex-1 flex flex-col justify-between">
        <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
        <p
          className="text-base text-text mb-4 overflow-hidden text-ellipsis"
          style={{ maxHeight: "120px" }}
        >
          {displayedText}
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} size="xl" />
            <span>
              {likesCount} {likesCount === 1 ? "Like" : "Likes"}
            </span>
          </button>
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
