import { jwtDecode } from "jwt-decode";
import React from "react";

interface User {
  _id: string;
  username: string;
  fullName: string;
}

interface Conversation {
  _id: string;
  participants: User[];
}

interface ConversationsListProps {
  conversations: Conversation[];
  followers: User[];
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: (participantId: string) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations = [],
  followers = [],
  onSelectConversation,
  onCreateConversation,
}) => {
  const token = localStorage.getItem("authToken");
  let userId: string | null = null;

  if (token) {
    const decoded: any = jwtDecode(token); // Decode the token to get user info
    userId = decoded.id;
  }

  return (
    <div className="w-1/4 bg-gray-50 shadow-lg m-4 p-4 rounded-xl">
      <h2 className="text-h2 font-heading font-bold mb-6 text-primary">
        Conversations
      </h2>
      <ul>
        {followers.length > 0 && (
          <>
            <h3 className="text-h3 font-heading text-secondary font-bold p-2 mb-4 border-b border-gray-200">
              Start a conversation
            </h3>
            {followers.map((follower) => (
              <li
                key={follower._id}
                className="p-4 cursor-pointer bg-white rounded-lg mb-3 hover:bg-secondary-light hover:shadow-md transition duration-200 ease-in-out"
                onClick={() => onCreateConversation(follower._id)}
              >
                <p className="font-body text-gray-800 text-body font-medium">
                  {follower.fullName || follower.username}
                </p>
              </li>
            ))}
          </>
        )}
        {conversations.length > 0 ? (
          <>
            <h3 className="text-h3 font-heading text-secondary font-bold p-2 mb-4 border-b border-gray-200">
              Existing Conversations
            </h3>
            {conversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(
                (participant) => participant._id !== userId
              );
              return (
                <li
                  key={conversation._id}
                  className="p-4 cursor-pointer bg-white rounded-lg mb-3 hover:bg-primary-light hover:shadow-md transition duration-200 ease-in-out"
                  onClick={() => onSelectConversation(conversation._id)}
                >
                  <p className="text-gray-800 font-body text-body font-medium">
                    Conversation with{" "}
                    {otherParticipant?.fullName || otherParticipant?.username}
                  </p>
                </li>
              );
            })}
          </>
        ) : (
          <li className="p-4 text-gray-500">No conversations available</li>
        )}
      </ul>
    </div>
  );
};

export default ConversationsList;
