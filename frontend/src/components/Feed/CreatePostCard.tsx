import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const CreatePostCard: React.FC = () => {
  const apiUrl = "https://connectify-11mf.onrender.com";

  // State hooks to manage the post content, image URL, modal visibility, and loading status
  const [postContent, setPostContent] = useState("");
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle the publishing of the post
  const handlePublish = async () => {
    setLoading(true); // Set loading state to true while publishing
    try {
      let uploadedImageUrl = null;

      // Step 1: If an image is selected, upload it to the server
      if (imageUrl) {
        const formData = new FormData();
        formData.append("image", imageUrl); // Append image file to FormData object

        const imageUploadResponse = await axios.post(
          `${apiUrl}/api/images/upload`, // Replace with your image upload endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure the correct content type for image upload
            },
          }
        );

        uploadedImageUrl = imageUploadResponse.data.url; // Capture the URL of the uploaded image
      }

      // Step 2: Create the post by sending post content and the image URL to the server
      const token = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
      await axios.post(
        `${apiUrl}/api/posts/create`, // Replace with your post creation endpoint
        {
          content: postContent, // Post content
          imageUrl: uploadedImageUrl, // Optional: uploaded image URL
          videoUrl: null, // Placeholder for potential future video support
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send authorization token for API requests
          },
        }
      );

      // Reset form state after successful post creation
      setPostContent("");
      setImageUrl(null);
      setIsModalOpen(false);
      setLoading(false);

      // Show success notification
      toast.success("Post uploaded successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
      // Show error notification
      toast.error("Error creating post.");
    }
  };

  // Function to handle image file selection and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(e.target.files[0]); // Set the selected file as the image URL
      setIsModalOpen(true); // Open modal for image preview
    }
  };

  // Function to close the image preview modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-secondary-light border border-gray-300 rounded-lg p-8 shadow-md">
      {/* Post Creation Heading */}
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

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition"
          onClick={handlePublish}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Publishing..." : "Publish"}
        </button>

        {/* Image Upload Button */}
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
            accept="image/*" // Accept only image files
          />
        </label>
      </div>

      {/* Image Preview Modal */}
      {isModalOpen && imageUrl && (
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
              src={URL.createObjectURL(imageUrl)}
              alt="Preview"
              className="max-w-full max-h-full rounded-md"
            />
          </div>
        </div>
      )}

      {/* ToastContainer to display success/error notifications */}
      <ToastContainer />
    </div>
  );
};

export default CreatePostCard;
