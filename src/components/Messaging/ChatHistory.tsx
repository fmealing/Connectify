import React from "react";

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
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((message) => (
        <div key={message._id} className="mb-4">
          <p className="font-semibold">{message.sender}</p>
          <p className="text-sm">{message.content}</p>
          <span className="text-xs text-gray-400">{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
