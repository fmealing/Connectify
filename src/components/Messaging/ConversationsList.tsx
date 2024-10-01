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
    <div className="w-1/4 bg-white shadow-md">
      <h2 className="text-lg font-bold p-4">Conversations</h2>
      <ul>
        {followers.length > 0 && (
          <>
            <h3 className="text-md font-bold p-2">Start a conversation</h3>
            {followers.map((follower) => (
              <li
                key={follower._id}
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={() => onCreateConversation(follower._id)}
              >
                <p>{follower.fullName || follower.username}</p>
              </li>
            ))}
          </>
        )}
        {conversations.length > 0 ? (
          <>
            <h3 className="text-md font-bold p-2">Existing Conversations</h3>
            {conversations.map((conversation) => {
              // Find the other participant in the conversation
              const otherParticipant = conversation.participants.find(
                (participant) => participant._id !== userId
              );
              return (
                <li
                  key={conversation._id}
                  className="p-4 cursor-pointer hover:bg-gray-200"
                  onClick={() => onSelectConversation(conversation._id)}
                >
                  <p>
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
