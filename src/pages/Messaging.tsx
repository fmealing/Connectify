import React, { useState, useEffect, useRef } from "react";
import ConversationsList from "../components/Messaging/ConversationsList";
import ChatHistory from "../components/Messaging/ChatHistory";
import ChatInput from "../components/Messaging/ChatInput";
import StartConversationForm from "../components/Messaging/StartConversationForm"; // Import the form
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface User {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

const MessagingPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<User[]>([]);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch user conversations from the backend (implement this later)
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setMessages([
      {
        id: 1,
        sender: user.name,
        content: user.lastMessage,
        timestamp: "10:00 AM",
      },
    ]);
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedUser) return;

    try {
      const response = await axios.post(
        `/conversation/${selectedUser.id}/messages`,
        {
          content: message,
        }
      );

      const { data } = response;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.messageData.id,
          sender: "Me",
          content: message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleLeaveChat = () => {
    setSelectedUser(null);
  };

  const handleConversationCreated = (newConversation: any) => {
    // Update conversation list with the new conversation
    const newUser = {
      id: newConversation._id,
      name: newConversation.participants[1].fullName, // Assume participants[1] is the other user
      lastMessage: "No messages yet",
      avatar: "/images/avatars/avatar-1.jpg", // Placeholder for avatar
    };
    setConversations((prevConversations) => [...prevConversations, newUser]);
  };

  // Scroll to the bottom of the chat history when a new message is sent
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-background">
      {/* Start Conversation Form */}
      <div className="w-1/3 flex flex-col">
        <StartConversationForm
          onConversationCreated={handleConversationCreated}
        />

        {/* Conversations List */}
        <ConversationsList
          users={conversations.map((user) => ({
            ...user,
            isSelected: selectedUser?.id === user.id,
            onSelectUser: () => handleSelectUser(user),
          }))}
        />
      </div>

      {/* Right Side: Chat Section */}
      <div className="w-2/3 flex flex-col p-6 bg-secondary-light min-h-screen">
        {!selectedUser ? (
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="text-h2 font-heading text-gray-600">
              Start Chatting Now!
            </h2>
            <p className="text-sm text-gray-500">
              Select a conversation to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="border-b-2 pb-4 mb-4">
              <h2 className="text-h2 font-heading">{selectedUser.name}</h2>
            </div>
            <button
              onClick={handleLeaveChat}
              className="text-primary hover:text-primary-dark transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Leave Chat
            </button>

            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto mb-4" ref={chatHistoryRef}>
                <ChatHistory messages={messages} />
              </div>
              <div className="sticky bottom-0 bg-secondary-light border-t-2 p-4">
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;
