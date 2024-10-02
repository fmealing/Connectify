import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FeedPostCard from "../components/Feed/FeedPostCard";
import ProfileCard from "../components/SearchResult/ProfileCard";

// Helper function to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage: React.FC = () => {
  const query = useQuery().get("query") || ""; // Get search query from the URL
  const [filter, setFilter] = useState("All");
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);

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
                postId={(post as any)._id}
                imageSrc={(post as any).imageUrl}
                content={(post as any).content}
                date={(post as any).date}
                initialLikesCount={(post as any).likesCount || 0}
                initiallyLiked={(post as any).likedByUser || false}
                initialComments={(post as any).comments || []}
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
                userId={(profile as any)._id} // Make sure to pass userId
                avatar={(profile as any).profilePicture}
                name={(profile as any).fullName}
                username={(profile as any).username}
                followersCount={(profile as any).followersCount || 0} // Make sure to pass the followers count
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
