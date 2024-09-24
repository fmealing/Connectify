import React from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

const ChatHistory: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-md p-4 mb-4">
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div
            className={`font-bold ${
              message.sender === "Me" ? "text-right" : ""
            }`}
          >
            {message.sender}
          </div>
          <div
            className={`p-2 rounded-lg max-w-xs ${
              message.sender === "Me"
                ? "bg-primary text-white ml-auto"
                : "bg-gray-100"
            }`}
          >
            {message.content}
          </div>
          <div className="text-sm text-gray-500 text-right">
            {message.timestamp}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
