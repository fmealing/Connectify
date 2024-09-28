import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CreatePostCard from "../components/Feed/CreatePostCard";
import FeedPostCard from "../components/Feed/FeedPostCard";

// Post interface
interface Post {
  _id: string; // Unique ID of the post
  user: string;
  content: string;
  imageUrl?: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: string[];
  createdAt: string;
}

interface DecodedToken {
  id: string; // Assuming the JWT contains user ID as 'id'
  email: string; // And possibly an email if necessary
  exp: number; // Expiration time
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Store the decoded user ID

  // Decode the JWT to get the user ID
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token); // Decode the token
        setUserId(decoded.id); // Set the user ID from the decoded token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/posts");
        console.log(response.data); // Log the response data
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <CreatePostCard />

      <div className="bg-background py-8 px-4">
        <h2 className="text-h2 font-heading text-center text-primary mb-6">
          Latest Posts
        </h2>
        <hr className="w-1/4 h-1 bg-primary mx-auto mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <FeedPostCard
              key={index}
              postId={post._id} // Pass the post ID
              imageSrc={post.imageUrl}
              textContent={post.content}
              date={post.createdAt}
              initialLikesCount={post.likes.length} // Pass the number of likes
              initiallyLiked={userId ? post.likes.includes(userId) : false} // Check if the post is already liked by the user
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
