import React from "react";

interface User {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string; // Add avatar property
  isSelected: boolean;
  onSelectUser: () => void;
}

const ConversationsList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="w-1/3 bg-white shadow-lg p-6 overflow-y-auto">
      <h2 className="text-h2 font-heading mb-6">Conversations</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={`p-4 mb-4 rounded-lg cursor-pointer flex items-center gap-4 ${
              user.isSelected ? "bg-accent text-white" : "bg-gray-100"
            }`}
            onClick={user.onSelectUser}
          >
            {/* Avatar */}
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Name and Last Message */}
            <div>
              <div className="font-bold">{user.name}</div>
              <div
                className={`text-sm ${
                  user.isSelected ? "text-white" : "text-gray-500"
                }`}
              >
                {user.lastMessage}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationsList;
