import React, { useState } from "react";
import FeedPostCard from "../components/Feed/FeedPostCard"; // Assuming this is the same card used for feed posts
import ProfileCard from "../components/SearchResult/ProfileCard"; // You'll create this component for profiles
import HashtagCard from "../components/SearchResult/HashtagCard"; // You'll create this component for hashtags

const SearchResultsPage: React.FC = () => {
  const [filter, setFilter] = useState("Most Relevant");

  // Mock data for posts, profiles, and hashtags
  const posts = [
    {
      imageSrc: "images/posts/post-1.jpg",
      textContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "24-09-2024",
    },
    {
      imageSrc: "images/posts/post-2.jpg",
      textContent:
        "Aenean euismod bibendum laoreet, consectetur adipiscing elit.",
      date: "23-09-2024",
    },
    {
      imageSrc: "images/posts/post-3.jpg",
      textContent:
        "Consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "22-09-2024",
    },
  ];

  const profiles = [
    {
      avatar: "/images/avatars/avatar-1.jpg",
      name: "John Doe",
      username: "johndoe",
      followers: 1200,
    },
    {
      avatar: "/images/avatars/avatar-2.jpg",
      name: "Jane Smith",
      username: "janesmith",
      followers: 950,
    },
    {
      avatar: "/images/avatars/avatar-3.jpg",
      name: "Alice Johnson",
      username: "alicejohnson",
      followers: 800,
    },
  ];

  const hashtags = [
    { name: "#WebDevelopment", postCount: 230 },
    { name: "#Coding", postCount: 520 },
    { name: "#ReactJS", postCount: 120 },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Section 1: Search Results Heading and Filter */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-h1 font-heading">Search results for: "flozza"</h1>
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

      {/* Section 2: Posts Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-h2 font-heading text-primary">Posts</h2>
          <button className="text-primary hover:underline">See more</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <FeedPostCard
              key={index}
              imageSrc={post.imageSrc}
              textContent={post.textContent}
              date={post.date}
            />
          ))}
        </div>
      </div>

      {/* Section 3: Profiles Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-h2 font-heading text-primary">Profiles</h2>
          <button className="text-primary hover:underline">See more</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              avatar={profile.avatar}
              name={profile.name}
              username={profile.username}
              followers={profile.followers}
            />
          ))}
        </div>
      </div>

      {/* Section 4: Hashtags Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-h2 font-heading text-primary">Hashtags</h2>
          <button className="text-primary hover:underline">See more</button>
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
    </div>
  );
};

export default SearchResultsPage;
