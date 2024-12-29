import React from 'react';
import { MessageCircle } from 'lucide-react';

const RecentMessages = () => {
  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      message: `Hi, I'm interested in your Sep 24 date. Is it still available?`,
      time: '2h ago',
      unread: true,
    },
    {
      id: 2,
      sender: 'Michael Brown',
      message: 'Thanks for your offer. Can we negotiate on the price?',
      time: '1d ago',
      unread: false,
    },
    // Add more messages as needed
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-xl p-4 border flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.unread ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <MessageCircle className={`w-5 h-5 ${message.unread ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{message.sender}</h3>
                <span className="text-sm text-gray-500">{message.time}</span>
              </div>
              <p className={`mt-1 ${message.unread ? 'font-medium' : 'text-gray-600'}`}>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full bg-gray-100 text-gray-900 py-2 rounded-lg hover:bg-gray-200">
        View All Messages
      </button>
    </div>
  );
};

export default RecentMessages;

