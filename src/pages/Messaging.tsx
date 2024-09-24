import React, { useState, useEffect, useRef } from "react";
import ConversationsList from "../components/Messaging/ConversationsList";
import ChatHistory from "../components/Messaging/ChatHistory";
import ChatInput from "../components/Messaging/ChatInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  const chatHistoryRef = useRef<HTMLDivElement>(null); // Reference for the chat history div

  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how's it going?",
      avatar: "/images/avatars/avatar-5.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Can we catch up later?",
      avatar: "/images/avatars/avatar-4.jpg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "I'll send over the files.",
      avatar: "/images/avatars/avatar-3.jpg",
    },
  ];

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

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), sender: "Me", content: message, timestamp: "Now" },
    ]);
  };

  // Scroll to the bottom of the chat history when a new user is selected or a new message is sent
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [selectedUser, messages]);

  // Handle leaving the chat - unselect a user
  const handleLeaveChat = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Conversations List */}
      <ConversationsList
        users={users.map((user) => ({
          ...user,
          isSelected: selectedUser?.id === user.id,
          onSelectUser: () => handleSelectUser(user),
        }))}
      />

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
            {/* Chat Header */}
            <div className="border-b-2 pb-4 mb-4">
              <h2 className="text-h2 font-heading">{selectedUser.name}</h2>
            </div>

            {/* Leave Chat Button */}
            <button
              onClick={handleLeaveChat}
              className="text-primary hover:text-primary-dark transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Leave Chat
            </button>

            {/* Chat History and Input */}
            <div className="flex-1 flex flex-col h-full">
              {/* Chat History */}
              <div
                className="flex-1 overflow-y-auto mb-4"
                ref={chatHistoryRef} // Attach ref to chat history div
              >
                <ChatHistory messages={messages} />
              </div>

              {/* Input for sending a message */}
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
