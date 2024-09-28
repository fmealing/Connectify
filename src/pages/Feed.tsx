import { useEffect, useState } from "react";
import CreatePostCard from "../components/Feed/CreatePostCard";
import FeedPostCard from "../components/Feed/FeedPostCard";
import axios from "axios";

// Post interface
interface Post {
  user: string; // User who created the post
  content: string; // Text content of the post
  imageUrl?: string; // Optional image URL
  videoUrl?: string; // Optional video URL
  comments: string[]; // Array of comment IDs
  likes: string[]; // Array of users who liked the post
  createdAt: string; // Post creation date
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State to hold posts

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
      <>
        <CreatePostCard />

        <div className="bg-background py-8 px-4">
          {/* Heading */}
          <h2 className="text-h2 font-heading text-center text-primary mb-6">
            Latest Posts
          </h2>
          <hr className="w-1/4 h-1 bg-primary mx-auto mb-6" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <FeedPostCard
                key={index}
                imageSrc={post.imageUrl || "/images/avatars/avatar-1.jpg"}
                textContent={post.content}
                date={post.createdAt}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default Feed;
