import React, { useState } from "react";
import axios from "axios";

interface StartConversationFormProps {
  onConversationCreated: (conversation: any) => void;
}

const StartConversationForm: React.FC<StartConversationFormProps> = ({
  onConversationCreated,
}) => {
  const [username, setUsername] = useState("");

  const handleCreateConversation = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token not found");
      return; // Ensure token exists
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/conversations",
        { participants: [username] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onConversationCreated(response.data.conversation);
    } catch (error) {
      console.error("Error creating conversation", error);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleCreateConversation}
        className="bg-primary text-white px-4 py-2 rounded-full"
      >
        Start Conversation
      </button>
    </div>
  );
};

export default StartConversationForm;
