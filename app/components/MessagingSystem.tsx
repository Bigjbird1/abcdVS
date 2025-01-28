import React, { useState, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface MessagingSystemProps {
  currentUser: string;
  otherUser: string;
}

const MessagingSystem: React.FC<MessagingSystemProps> = ({
  currentUser,
  otherUser,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // In a real app, you would fetch messages from an API
    setMessages([
      {
        id: 1,
        sender: otherUser,
        content:
          "Hi, I'm interested in your venue. Is it still available for July 15th?",
        timestamp: "2023-06-20T10:30:00Z",
      },
      {
        id: 2,
        sender: currentUser,
        content:
          "Hello! Yes, it's still available for that date. Would you like more information?",
        timestamp: "2023-06-20T10:35:00Z",
      },
    ]);
  }, [currentUser, otherUser]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: currentUser,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">{otherUser}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === currentUser
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Paperclip className="w-5 h-5" />
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessagingSystem;
