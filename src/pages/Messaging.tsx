import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ChatHistory from "../components/Messaging/ChatHistory";
import ChatInput from "../components/Messaging/ChatInput";
import ConversationsList from "../components/Messaging/ConversationsList";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

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

  // Fetch initial conversations and followers
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    let userId: string | null = null;

    if (token) {
      const decoded: any = jwtDecode(token);
      userId = decoded.id;
    }

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

  // Create a new conversation
  const createConversation = async (participantId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/conversations/create",
        { userIds: [participantId] }
      );
      setConversations([...conversations, response.data]);
      setSelectedConversation(response.data);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // Fetch messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/conversations/${selectedConversation._id}/messages`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();

      // Setup Pusher to listen for new messages
      const pusher = new Pusher("your-pusher-key", {
        cluster: "your-cluster",
      });

      const channel = pusher.subscribe(
        `conversation-${selectedConversation._id}`
      );
      channel.bind("new-message", (data: { message: Message }) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      return () => {
        pusher.unsubscribe(`conversation-${selectedConversation._id}`);
      };
    }
  }, [selectedConversation]);

  // Send a new message
  const sendMessage = async (content: string) => {
    if (!selectedConversation) return;
    const token = localStorage.getItem("authToken");
    const decoded: any = jwtDecode(token);
    const senderId = decoded.id;

    try {
      await axios.post("http://localhost:5001/api/conversations/messages", {
        conversationId: selectedConversation._id,
        senderId,
        content,
      });
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
        onCreateConversation={createConversation}
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
