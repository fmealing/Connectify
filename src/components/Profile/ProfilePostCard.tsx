import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface PostCardProps {
  postId: string;
  imageSrc: string;
  textContent: string;
  date: string;
  onUpdate: (updatedPost: { content: string; imageUrl: string }) => void; // onUpdate function passed down
  onDelete: (postId: string) => void; // onDelete function passed down
}

const ProfilePostCard: React.FC<PostCardProps> = ({
  postId,
  imageSrc,
  textContent,
  date,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(textContent);
  const [editedImage, setEditedImage] = useState<File | null>(null);

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("content", editedContent);

    // Check if there is a new image uploaded
    if (editedImage) {
      formData.append("image", editedImage); // Use "image" as the field name for file
    }

    try {
      const response = await axios.put(
        `http://localhost:5001/api/posts/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Call the onUpdate function to update the post in the frontend state
      onUpdate({
        content: editedContent,
        imageUrl: response.data.post.imageUrl || imageSrc, // Use the new image URL if available
      });

      setIsEditing(false); // Close the edit mode
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(
        `http://localhost:5001/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Call onDelete function to remove the post from the frontend state
        onDelete(postId);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-background shadow-md rounded-lg overflow-hidden w-full max-w-sm h-[400px] flex flex-col">
      {imageSrc && !isEditing && (
        <div
          className="w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      )}

      {isEditing ? (
        <div className="p-6">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Edit content"
          />
          <input
            type="file"
            onChange={(e) =>
              e.target.files && setEditedImage(e.target.files[0])
            }
            className="mb-4"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-2">{date}</p>
          <p className="text-base text-gray-800 mb-4">{textContent}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePostCard;
