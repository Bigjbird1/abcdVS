'use client'

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Search, 
  Phone, 
  Flag, 
  Clock, 
  Send, 
  Paperclip, 
  User, 
  HelpCircle, 
  Shield 
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ConversationList from './communication/ConversationList';
import ChatArea from './communication/ChatArea';
import { Conversation, ChatType, ChatStatus } from '@/types/chat';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-1.5 rounded-lg text-sm ${
      isActive
        ? 'bg-gray-900 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

const SearchBox: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => (
  <div className="relative mb-4">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search conversations..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  </div>
);

const CommunicationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'support'>('messages');
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: 1,
      type: 'buyer',
      name: 'Sarah & Michael',
      avatar: null,
      lastMessage: "Hi, I'm interested in your Sep 24 date",
      timestamp: '2 min ago',
      unread: 2,
      status: 'online'
    },
    {
      id: 2,
      type: 'venue',
      name: 'Grand Estate Venue',
      avatar: null,
      lastMessage: "Your transfer request has been received",
      timestamp: '1 hour ago',
      unread: 0,
      status: 'offline'
    },
    {
      id: 3,
      type: 'support',
      name: 'WeddingTransfer Support',
      avatar: null,
      lastMessage: "How can I help you today?",
      timestamp: '1 day ago',
      unread: 0,
      status: 'online'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Fixed type for handleChatSelection
  const handleChatSelection = (chat: Conversation) => {
    setSelectedChat(chat);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="grid grid-cols-12 divide-x h-[600px]">
        {/* Sidebar */}
        <div className="col-span-4 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b">
            <SearchBox 
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <div className="flex gap-2">
              <TabButton
                label="Messages"
                isActive={activeTab === 'messages'}
                onClick={() => setActiveTab('messages')}
              />
              <TabButton
                label="Support"
                isActive={activeTab === 'support'}
                onClick={() => setActiveTab('support')}
              />
            </div>
          </div>

          {/* Conversations List */}
          <ConversationList 
            conversations={conversations}
            activeTab={activeTab}
            selectedChat={selectedChat}
            setSelectedChat={handleChatSelection}  {/* Fixed: Passing the handler function */}
          />
        </div>

        {/* Chat Area */}
        <div className="col-span-8 flex flex-col">
          <ChatArea 
            selectedChat={selectedChat}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunicationSystem;

export default CommunicationSystem;
