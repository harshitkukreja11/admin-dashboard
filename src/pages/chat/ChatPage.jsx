import React, { useState } from "react";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  const conversations = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "Let’s schedule a meeting." },
    { id: 3, name: "David Wilson", lastMessage: "Check the latest report." },
  ];

  return (
    <div className="d-flex border rounded shadow-sm" style={{ height: "80vh" }}>
      <ConversationList
        conversations={conversations}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
}
