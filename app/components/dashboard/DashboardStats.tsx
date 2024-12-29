import React from 'react';
import { Package, DollarSign, Calendar, MessageCircle, Heart, Users } from 'lucide-react';

interface DashboardStatsProps {
  userType: 'buyer' | 'seller';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userType }) => {
  const stats = userType === 'seller' 
    ? [
        { label: 'Active Listings', value: '12', change: '+2', icon: Package },
        { label: 'Total Revenue', value: '$45,850', change: '+15%', icon: DollarSign },
        { label: 'Pending Transfers', value: '8', change: '-1', icon: Calendar },
        { label: 'New Messages', value: '24', change: '+6', icon: MessageCircle },
      ]
    : [
        { label: 'Saved Searches', value: '5', change: '+1', icon: Heart },
        { label: 'Viewed Listings', value: '28', change: '+7', icon: Package },
        { label: 'Offers Made', value: '3', change: '+1', icon: DollarSign },
        { label: 'New Messages', value: '12', change: '+3', icon: MessageCircle },
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-gray-600" />
            </div>
            <span className={`text-sm ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="font-semibold text-2xl mb-1">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

