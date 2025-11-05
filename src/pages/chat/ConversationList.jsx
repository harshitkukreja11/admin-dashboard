import React from "react";

export default function ConversationList({ conversations, selectedChat, onSelectChat }) {
  return (
    <div className="border-end bg-light" style={{ width: "300px", overflowY: "auto" }}>
      <div className="p-3 border-bottom">
        <h5>Conversations</h5>
      </div>
      {conversations.map((chat) => (
        <div
          key={chat.id}
          className={`p-3 border-bottom ${selectedChat?.id === chat.id ? "bg-primary text-white" : "bg-white"
            }`}
          onClick={() => onSelectChat(chat)}
          style={{ cursor: "pointer" }}
        >
          <strong>{chat.name}</strong>
          <p className="mb-0 small">{chat.lastMessage}</p>
        </div>
      ))}
    </div>
  );
}
