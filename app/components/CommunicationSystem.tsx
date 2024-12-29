'use client'

import React, { useState } from 'react';
import { MessageCircle, Search, Phone, Flag, Clock, Send, Paperclip, User, HelpCircle, AlertCircle, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ConversationList from './communication/ConversationList';
import ChatArea from './communication/ChatArea';

const CommunicationSystem = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for conversations
  const conversations = [
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

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="grid grid-cols-12 divide-x h-[600px]">
        {/* Sidebar */}
        <div className="col-span-4 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b">
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-1.5 rounded-lg text-sm ${
                  activeTab === 'messages'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-1.5 rounded-lg text-sm ${
                  activeTab === 'support'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Support
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <ConversationList 
            conversations={conversations}
            activeTab={activeTab}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
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

