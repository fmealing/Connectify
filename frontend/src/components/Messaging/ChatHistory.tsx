import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

interface Message {
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const [userDetails, setUserDetails] = useState<{ [key: string]: string }>({});

  const fetchUserDetails = async (userId: string) => {
    if (!userDetails[userId]) {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const user = response.data;
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          [userId]: user.fullName || user.username,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    messages.forEach((message) => {
      fetchUserDetails(message.sender);
    });
  }, [messages]);

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {messages.map((message) => {
        const isCurrentUser = message.sender === localStorage.getItem("userId");
        return (
          <div
            key={message._id}
            className={`mb-4 p-4 rounded-lg shadow-lg ${
              isCurrentUser
                ? "bg-primary text-white self-end ml-auto"
                : "bg-white text-gray-800"
            } max-w-lg transition duration-300 ease-in-out`}
          >
            <div className="flex justify-between">
              <p className="font-semibold">
                {userDetails[message.sender] || "Loading..."}
              </p>
              <span className="text-xs text-gray-400">
                {format(new Date(message.timestamp), "Pp")}
              </span>
            </div>
            <p className="text-sm mt-2">{message.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatHistory;
