import React, { useState } from "react";

const ChatInput: React.FC<{ onSendMessage: (message: string) => void }> = ({
  onSendMessage,
}) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-full border rounded-full px-4 py-2 shadow focus:outline-none"
      />
      <button
        onClick={handleSendMessage}
        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
