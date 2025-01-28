import React from "react";
import {
  User,
  Phone,
  Flag,
  Shield,
  HelpCircle,
  Paperclip,
  Send,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Conversation, ChatType, ChatStatus } from "@/types/chat";

interface ChatAreaProps {
  selectedChat: Conversation | null;
  message: string;
  setMessage: (message: string) => void;
}

interface MessageProps {
  content: string;
  timestamp: string;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ content, timestamp, isSent }) => (
  <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
    <div
      className={`${
        isSent ? "bg-gray-900 text-white" : "bg-gray-100"
      } rounded-lg p-3 max-w-[80%]`}
    >
      <p>{content}</p>
      <p
        className={`text-xs ${isSent ? "text-gray-300" : "text-gray-500"} mt-1`}
      >
        {timestamp}
      </p>
    </div>
  </div>
);

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedChat,
  message,
  setMessage,
}) => {
  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement send message logic
      setMessage("");
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="font-medium mb-2">Select a conversation</h3>
        <p className="text-sm text-gray-600">
          Choose a conversation from the list to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="font-medium">{selectedChat.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  selectedChat.status === "online"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />
              <span className="text-gray-600">
                {selectedChat.status === "online" ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedChat.type === "buyer" && (
            <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Phone className="w-5 h-5" />
            </button>
          )}
          <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedChat.type === "venue" && (
          <Alert className="mb-4">
            <Shield className="w-4 h-4" />
            <AlertDescription>
              This is an official communication channel with your venue. All
              messages are recorded for verification purposes.
            </AlertDescription>
          </Alert>
        )}

        {selectedChat.type === "support" && (
          <Alert className="mb-4">
            <HelpCircle className="w-4 h-4" />
            <AlertDescription>
              You're chatting with WeddingTransfer Support. We're here to help
              with any questions or concerns.
            </AlertDescription>
          </Alert>
        )}

        <Message
          content="Hi, I'm interested in your September 24th wedding date. Is it still available?"
          timestamp="10:30 AM"
          isSent={false}
        />

        <Message
          content="Yes, it's still available! The venue is The Grand Estate and includes full catering package."
          timestamp="10:35 AM"
          isSent={true}
        />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
