import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-4 border rounded-full"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 px-6 py-4 bg-primary text-white rounded-full"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
