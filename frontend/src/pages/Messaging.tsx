import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ChatHistory from "../components/Messaging/ChatHistory";
import ChatInput from "../components/Messaging/ChatInput";
import ConversationsList from "../components/Messaging/ConversationsList";
import { useEffect, useState } from "react";
import pusher from "../pusher";
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

interface Message {
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const MessagingPage: React.FC = () => {
  const apiUrl = "https://connectify-11mf.onrender.com";

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
        const response = await axios.get(`${apiUrl}/api/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    const fetchFollowers = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `${apiUrl}/api/users/${userId}/followers`
        );
        setFollowers(response.data.followers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchConversations();
    fetchFollowers();
  }, []);

  const createConversation = async (participantId: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    const existingConversation = conversations.find((conversation) =>
      conversation.participants.some(
        (participant) => participant._id === participantId
      )
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
    } else {
      try {
        const response = await axios.post(
          `${apiUrl}/api/conversations/create`,
          { userIds: [userId, participantId] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations([...conversations, response.data]);
        setSelectedConversation(response.data);
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${apiUrl}/api/conversations/${conversationId}/messages`,
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

  const sendMessage = async (content: string) => {
    if (!selectedConversation) return;
    const token = localStorage.getItem("authToken");
    const decoded: any = jwtDecode(token as any);
    const senderId = decoded.id;

    try {
      await axios.post(
        `${apiUrl}/api/conversations/messages`,
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
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-gray-100">
      {/* Conversations List */}
      <ConversationsList
        conversations={conversations}
        followers={followers}
        onSelectConversation={(conversationId) => {
          const selected = conversations.find((c) => c._id === conversationId);
          setSelectedConversation(selected || null);
        }}
        onCreateConversation={createConversation}
      />

      {/* Chat History */}
      {selectedConversation ? (
        <div className="flex-1 bg-white shadow-md rounded-lg m-4 p-4 flex flex-col justify-between mb-10">
          <ChatHistory messages={messages} />
          <ChatInput onSendMessage={sendMessage} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-text">
          <h2 className="font-heading text-h2">
            Select a conversation to start chatting
          </h2>
        </div>
      )}
    </div>
  );
};

export default MessagingPage;
