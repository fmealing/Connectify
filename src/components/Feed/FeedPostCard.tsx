import React, { useEffect, useState } from "react";
import { faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

interface Comment {
  _id: string;
  content: string;
  user: { fullName: string };
  createdAt: string;
}

interface FeedPostCardProps {
  postId: string;
  imageSrc?: string;
  textContent: string;
  date: string;
  initialLikesCount: number;
  initiallyLiked: boolean;
  initialComments: Comment[];
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({
  postId,
  imageSrc,
  textContent,
  date,
  initialLikesCount,
  initiallyLiked,
  initialComments = [],
}) => {
  const maxLength = 100;
  const isTextTruncated = textContent.length > maxLength;
  const displayedText = isTextTruncated
    ? textContent.slice(0, maxLength) + "..."
    : textContent;

  const [liked, setLiked] = useState(initiallyLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState(false); // Toggle visibility for comments

  // Handle post like/unlike
  const handleLike = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (liked) {
        await axios.post(
          "http://localhost:5001/api/interactions/posts/unlike",
          { postId },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setLikesCount((prevCount) => prevCount - 1);
      } else {
        await axios.post(
          "http://localhost:5001/api/interactions/posts/like",
          { postId },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setLikesCount((prevCount) => prevCount + 1);
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking post", error);
    }
  };

  // Handle comment creation
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:5001/api/comments/create",
        { postId, content: newComment },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      setComments((prevComments) => [...prevComments, response.data.comment]);
      setNewComment(""); // Reset input field
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  // Toggle comments visibility
  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  // Format the date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/comments/${postId}`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div className="bg-background shadow-md rounded-lg overflow-hidden w-full h-auto flex flex-col">
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
          <button
            onClick={handleCommentToggle}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
          >
            <FontAwesomeIcon icon={faCommentDots} size="xl" />
            <span>Comment</span>
          </button>
        </div>

        {/* Display Comments Section */}
        {showComments && (
          <div className="mt-4">
            {/* Add Comment Form - Above the existing comments */}
            <div className="mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="Add a comment..."
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-primary text-white px-4 py-2 rounded mt-2"
              >
                Submit
              </button>
            </div>

            {/* Existing Comments */}
            <h3 className="text-sm text-gray-500 mb-2">Comments</h3>
            <ul className="space-y-2">
              {comments.map((comment) => (
                <li key={comment._id} className="bg-gray-100 p-2 rounded">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPostCard;
