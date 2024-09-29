import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FeedPostCard from "../components/Feed/FeedPostCard";
import ProfileCard from "../components/SearchResult/ProfileCard";
import HashtagCard from "../components/SearchResult/HashtagCard";

// Helper function to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage: React.FC = () => {
  const query = useQuery().get("query") || ""; // Get search query from the URL
  const [filter, setFilter] = useState("All");
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (filter === "All" || filter === "Posts") {
          const postResponse = await axios.get(
            `http://localhost:5001/api/posts/search/posts?search=${query}`
          );
          setPosts(postResponse.data);
          console.log(postResponse.data);
        }

        if (filter === "All" || filter === "Profiles") {
          const profileResponse = await axios.get(
            `http://localhost:5001/api/users/search/users?search=${query}`
          );
          setProfiles(profileResponse.data);
        }

        if (filter === "All" || filter === "Hashtags") {
          const hashtagResponse = await axios.get(
            `http://localhost:5001/api/hashtags/search/hashtags?search=${query}`
          );
          setHashtags(hashtagResponse.data);
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    fetchSearchResults();
  }, [filter, query]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-h1 font-heading">Search results for: "{query}"</h1>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 bg-white"
        >
          <option value="All">All</option>
          <option value="Posts">Posts</option>
          <option value="Profiles">Profiles</option>
          <option value="Hashtags">Hashtags</option>
        </select>
      </div>

      {/* Posts (Conditionally Rendered) */}
      {(filter === "All" || filter === "Posts") && (
        <div className="mb-12">
          <h2 className="text-h2 font-heading text-primary">Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <FeedPostCard
                key={index}
                postId={post._id}
                imageSrc={post.imageUrl}
                content={post.content}
                date={post.date}
                initialLikesCount={post.likesCount || 0}
                initiallyLiked={post.likedByUser || false}
                initialComments={post.comments || []}
              />
            ))}
          </div>
        </div>
      )}

      {/* Profiles (Conditionally rendered) */}
      {(filter == "All" || filter == "Profiles") && (
        <div className="mb-12">
          <h2 className="text-h2 font-heading text-primary">Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile, index) => (
              <ProfileCard
                key={index}
                avatar={profile.profilePicture}
                name={profile.fullName}
                username={profile.username}
                followers={profile.followers}
              />
            ))}
          </div>
        </div>
      )}

      {/* Hashtags (Conditionally Rendered) */}
      {(filter === "All" || filter === "Hashtags") && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-h2 font-heading text-primary">Hashtags</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hashtags.map((hashtag, index) => (
              <HashtagCard
                key={index}
                name={hashtag.name}
                postCount={hashtag.postCount}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
