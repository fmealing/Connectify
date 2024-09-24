import React from "react";

interface HashtagCardProps {
  name: string;
  postCount: number;
}

const HashtagCard: React.FC<HashtagCardProps> = ({ name, postCount }) => {
  return (
    <div className="bg-secondary-light shadow-md rounded-lg p-4 flex items-center">
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{postCount} Posts</p>
      </div>
    </div>
  );
};

export default HashtagCard;
