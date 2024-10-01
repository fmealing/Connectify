import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
}

interface Conversation {
  _id: string;
  participants: string[]; // Now it's an array of user IDs (strings)
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
  const [userDetails, setUserDetails] = useState<{ [key: string]: User }>({}); // To store fetched user details

  // Get userId from token
  const token = localStorage.getItem("authToken");
  let userId: string | null = null;
  if (token) {
    const decoded: any = jwtDecode(token); // Decode the token to get user info
    userId = decoded.id;
  }

  // Function to fetch details of other users in conversations
  const fetchOtherUserDetails = async (otherUserId: string) => {
    if (!userDetails[otherUserId]) {
      try {
        console.log(`Fetching details for userID: ${otherUserId}`);
        const response = await axios.get(
          `http://localhost:5001/api/users/${otherUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response data:", response.data);

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          [otherUserId]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  // Fetch other participants for all conversations
  useEffect(() => {
    conversations.forEach((conversation) => {
      const otherParticipantId = conversation.participants.find(
        (participantId) => participantId !== userId // We are now working with IDs (strings)
      );
      console.log("Other Participant ID:", otherParticipantId);

      if (otherParticipantId) {
        fetchOtherUserDetails(otherParticipantId); // Fetch user details using the participant's ID
      }
    });
  }, [conversations, userId]); // Dependency array includes conversations and userId

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
                <p>{(follower as any).fullName || follower.username}</p>
              </li>
            ))}
          </>
        )}
        {conversations.length > 0 ? (
          <>
            <h3 className="text-md font-bold p-2">Existing Conversations</h3>
            {conversations.map((conversation) => {
              const otherParticipantId = conversation.participants.find(
                (participantId) => participantId !== userId // We are working with ID strings
              );

              if (!otherParticipantId) return null; // Ensure otherParticipantId exists

              return (
                <li
                  key={conversation._id}
                  className="p-4 cursor-pointer hover:bg-gray-200"
                  onClick={() => onSelectConversation(conversation._id)}
                >
                  <p>
                    Conversation with{" "}
                    {userDetails[otherParticipantId]?.fullName ||
                      userDetails[otherParticipantId]?.username ||
                      "Loading..."}
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
