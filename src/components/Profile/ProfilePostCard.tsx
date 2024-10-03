import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface PostCardProps {
  postId: string;
  imageSrc: string;
  textContent: string;
  date: string;
  onUpdate: (updatedPost: { content: string; imageUrl: string }) => void;
  onDelete: (postId: string) => void;
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

    if (editedImage) {
      formData.append("image", editedImage);
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

      onUpdate({
        content: editedContent,
        imageUrl: response.data.post.imageUrl || imageSrc,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(
        `http://localhost/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onDelete(postId);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md flex flex-col transform transition duration-300 hover:shadow-xl">
      {imageSrc && !isEditing && (
        <div
          className="w-full h-48 bg-cover bg-center rounded-t-xl"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      )}

      {isEditing ? (
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg shadow-inner">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-light shadow-md transition duration-300"
            placeholder="Edit your post content"
            rows={4}
          />
          <label className="block mb-2 text-gray-600">Change Image:</label>

          {/* Custom file input button */}
          <div className="mb-4">
            <label className="block w-full bg-primary text-white text-center py-2 rounded-full cursor-pointer hover:bg-primary-dark transition duration-300">
              Upload New Image
              <input
                type="file"
                onChange={(e) =>
                  e.target.files && setEditedImage(e.target.files[0])
                }
                className="hidden"
              />
            </label>
            {editedImage && (
              <p className="mt-2 text-sm text-gray-600">
                Image selected: {editedImage.name}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-full shadow-lg hover:bg-primary-dark transition duration-300 transform hover:scale-105"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-500 transition duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-2">{date}</p>
          <p className="text-base text-gray-800 mb-4">{textContent}</p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition duration-300"
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
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
