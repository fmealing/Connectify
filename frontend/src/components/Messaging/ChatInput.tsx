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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default form submit behavior
      handleSendMessage(); // Send the message when Enter is pressed
    }
  };

  return (
    <div className="p-4 flex items-center bg-white border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 px-6 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
