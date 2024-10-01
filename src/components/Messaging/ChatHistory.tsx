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

  // Fetch user details based on sender ID
  const fetchUserDetails = async (userId: string) => {
    if (!userDetails[userId]) {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}`
        );
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
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((message) => (
        <div key={message._id} className="mb-4">
          <p className="font-semibold">
            {userDetails[message.sender] || "Loading..."}
          </p>
          <p className="text-sm">{message.content}</p>
          <span className="text-xs text-gray-400">
            {format(new Date(message.timestamp), "Pp")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
