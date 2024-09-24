import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";

const CreatePostCard: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublish = () => {
    console.log("Post Published:", postContent, image);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsModalOpen(true); // Open modal when an image is uploaded
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-secondary-light border border-gray-300 rounded-lg p-8 shadow-md">
      {/* Heading */}
      <h2 className="text-h2 font-heading mb-2 text-primary">Create</h2>
      <p className="text-h3 font-body text-gray-600 mb-6">
        What's on your mind?
      </p>

      {/* Text Area for Post Content */}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write your post here..."
        className="w-full h-32 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-6"
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition"
          onClick={handlePublish}
        >
          Publish
        </button>

        <label
          htmlFor="imageUpload"
          className="bg-white text-primary border border-primary px-6 py-3 rounded-full cursor-pointer hover:bg-gray-100 transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faImage} className="text-primary" />
          Add Image
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </label>
      </div>

      {/* Image Modal */}
      {isModalOpen && image && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl max-h-[80vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-10"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>

            {/* Image Preview */}
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="max-w-full max-h-full rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostCard;
