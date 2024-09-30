import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ChatHistory from "../components/Messaging/ChatHistory";
import ChatInput from "../components/Messaging/ChatInput";
import ConversationsList from "../components/Messaging/ConversationsList";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
}

interface Conversation {
  _id: string;
  participants: User[];
}

interface Message {
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const MessagingPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Get the JWT token from localStorage (or wherever it is stored)
    const token = localStorage.getItem("token");
    let userId: string | null = null;

    if (token) {
      const decoded: any = jwtDecode(token); // Decode the token to get user info
      userId = decoded._id; // Assuming user ID is stored as '_id' in the JWT
    }

    // Fetch conversations on load
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/conversations"
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    // Fetch followers on load if userId is available
    const fetchFollowers = async () => {
      if (!userId) return; // If no userId is found, don't proceed
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}/followers`
        );
        setFollowers(response.data.followers); // Access the followers list
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchConversations();
    fetchFollowers();
  }, []);

  // Create a new conversation
  const createConversation = async (participantId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/conversations/create",
        { userIds: [participantId] } // Pass the selected follower's ID
      );
      setConversations([...conversations, response.data]); // Add the new conversation
      setSelectedConversation(response.data); // Select the newly created conversation
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Conversations List */}
      <ConversationsList
        conversations={conversations}
        followers={followers} // Pass followers to ConversationsList
        onSelectConversation={(conversationId) => {
          const selected = conversations.find((c) => c._id === conversationId);
          setSelectedConversation(selected || null);
        }}
        onCreateConversation={createConversation} // Pass function to create new conversation
      />

      {/* Chat Section */}
      {selectedConversation ? (
        <div className="w-3/4">
          <ChatHistory messages={messages} />
          <ChatInput
            onSendMessage={(message) => {
              // TODO: Implement message sending here
            }}
          />
        </div>
      ) : (
        <div className="w-3/4 flex items-center justify-center">
          <p>Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default MessagingPage;
