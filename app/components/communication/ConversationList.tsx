import React from 'react';
import { MessageCircle, HelpCircle, User } from 'lucide-react';

interface Conversation {
  id: number;
  type: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeTab: 'messages' | 'support';
  selectedChat: Conversation | null;
  setSelectedChat: (chat: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeTab,
  selectedChat,
  setSelectedChat
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations
        .filter(conv => 
          activeTab === 'messages' ? conv.type !== 'support' : conv.type === 'support'
        )
        .map(conversation => (
          <button
            key={conversation.id}
            onClick={() => setSelectedChat(conversation)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 ${
              selectedChat?.id === conversation.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              {conversation.type === 'venue' ? (
                <MessageCircle className="w-6 h-6 text-gray-400" />
              ) : conversation.type === 'support' ? (
                <HelpCircle className="w-6 h-6 text-gray-400" />
              ) : (
                <User className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium truncate">{conversation.name}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {conversation.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
            </div>
            {conversation.unread > 0 && (
              <span className="w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {conversation.unread}
              </span>
            )}
          </button>
        ))}
    </div>
  );
};

export default ConversationList;

