import React from "react";

interface HashtagCardProps {
  name: string;
  postCount: number;
}

const HashtagCard: React.FC<HashtagCardProps> = ({ name, postCount }) => {
  return (
    <div className="hashtag-card bg-secondary-light p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{postCount} posts</p>
    </div>
  );
};

export default HashtagCard;
