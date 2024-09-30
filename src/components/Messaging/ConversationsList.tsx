import React from "react";

interface User {
  _id: string;
  username: string;
}

interface Conversation {
  _id: string;
  participants: User[];
}

interface ConversationsListProps {
  conversations: Conversation[];
  followers: User[];
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: (participantId: string) => void; // New prop to handle conversation creation
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations = [],
  followers = [],
  onSelectConversation,
  onCreateConversation,
}) => {
  console.log("conversations", conversations);
  console.log("followers", followers);

  return (
    <div className="w-1/4 bg-white shadow-md">
      <h2 className="text-lg font-bold p-4">Conversations</h2>
      <ul>
        {followers.length > 0 && (
          <>
            <h3 className="text-md font-bold p-2">Followers</h3>
            {followers.map((follower) => (
              <li
                key={follower._id}
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => onCreateConversation(follower._id)} // Create a new conversation with the follower
              >
                <p>{follower.username}</p>
              </li>
            ))}
          </>
        )}
        {Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conversation) => (
            <li
              key={conversation._id}
              className="p-4 cursor-pointer hover:bg-gray-200"
              onClick={() => onSelectConversation(conversation._id)}
            >
              {conversation.participants.length > 0 && (
                <p>
                  Conversation between:
                  <br />
                  {conversation.participants
                    .map((participant) => participant.username)
                    .join(" and ")}
                </p>
              )}
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No conversations available</li>
        )}
      </ul>
    </div>
  );
};

export default ConversationsList;
