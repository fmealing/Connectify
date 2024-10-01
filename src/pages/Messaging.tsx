import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ChatHistory from "../components/Messaging/ChatHistory";
import ChatInput from "../components/Messaging/ChatInput";
import ConversationsList from "../components/Messaging/ConversationsList";
import { useEffect, useState } from "react";
import pusher from "../pusher";

interface User {
  _id: string;
  username: string;
  fullName: string;
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
    const token = localStorage.getItem("authToken");
    let userId: string | null = null;

    if (token) {
      const decoded: any = jwtDecode(token);
      userId = decoded.id;
    }

    const fetchConversations = async () => {
      if (!token) {
        console.error("No auth token found");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5001/api/conversations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    const fetchFollowers = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}/followers`
        );
        setFollowers(response.data.followers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchConversations();
    fetchFollowers();
  }, []);

  // Create a new conversation between the logged-in user and another user
  const createConversation = async (participantId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    try {
      const response = await axios.post(
        "http://localhost:5001/api/conversations/create",
        { userIds: [userId, participantId] }, // Send the user IDs to create a conversation
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversations([...conversations, response.data]);
      setSelectedConversation(response.data); // Automatically select the newly created conversation
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `http://localhost:5001/api/conversations/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);

      // Set up Pusher for real-time message updates
      const channel = pusher.subscribe(
        `conversation-${selectedConversation._id}`
      );
      channel.bind("new-message", (data: { message: Message }) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      // Clean up Pusher subscription on unmount or conversation change
      return () => {
        pusher.unsubscribe(`conversation-${selectedConversation._id}`);
      };
    }
  }, [selectedConversation]);

  const sendMessage = async (content: string) => {
    if (!selectedConversation) return;
    const token = localStorage.getItem("authToken");
    const decoded: any = jwtDecode(token as any);
    const senderId = decoded.id;

    try {
      await axios.post(
        "http://localhost:5001/api/conversations/messages",
        {
          conversationId: selectedConversation._id,
          senderId,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <ConversationsList
        conversations={conversations}
        followers={followers}
        onSelectConversation={(conversationId) => {
          const selected = conversations.find((c) => c._id === conversationId);
          setSelectedConversation(selected || null);
        }}
        onCreateConversation={createConversation} // Add the createConversation function here
      />

      {selectedConversation ? (
        <div className="w-3/4">
          <ChatHistory messages={messages} />
          <ChatInput onSendMessage={sendMessage} />
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
