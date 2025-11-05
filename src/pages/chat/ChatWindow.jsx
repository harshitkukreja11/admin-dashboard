import React, { useState, useEffect, useRef } from "react";

export default function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      // Sample initial messages (simulate loading conversation)
      setMessages([
        { from: "them", text: selectedChat.lastMessage },
        { from: "me", text: "Got it!" },
      ]);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  if (!selectedChat)
    return (
      <div className="flex-fill d-flex align-items-center justify-content-center text-muted">
        Select a conversation to start chatting
      </div>
    );

  return (
    <div className="flex-fill d-flex flex-column">
      <div className="border-bottom p-3">
        <h5 className="mb-0">{selectedChat.name}</h5>
      </div>

      <div className="flex-fill p-3 overflow-auto" style={{ background: "#f8f9fa" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${msg.from === "me" ? "justify-content-end" : "justify-content-start"}`}
          >
            <div
              className={`p-2 rounded ${msg.from === "me" ? "bg-primary text-white" : "bg-white border"
                }`}
              style={{ maxWidth: "70%" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 border-top d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" className="btn btn-outline-secondary">
          📎
        </button>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
