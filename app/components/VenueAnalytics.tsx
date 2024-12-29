'use client'

import React, { useState } from 'react';
import { Calendar, TrendingUp, Clock, DollarSign, Users, BarChart3, ArrowUpRight, ArrowDownRight, Package, Award, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VenueAnalytics = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  // Mock data for charts
  const seasonalityData = [
    { month: 'Jan', transfers: 4, directBookings: 8, revenue: 12000 },
    { month: 'Feb', transfers: 6, directBookings: 7, revenue: 15000 },
    { month: 'Mar', transfers: 8, directBookings: 12, revenue: 24000 },
    { month: 'Apr', transfers: 12, directBookings: 15, revenue: 32000 },
    { month: 'May', transfers: 15, directBookings: 18, revenue: 40000 },
    { month: 'Jun', transfers: 10, directBookings: 20, revenue: 36000 }
  ];

  const popularPackages = [
    { name: 'Premium Weekend', transfers: 24, revenue: 72000 },
    { name: 'Evening Reception', transfers: 18, revenue: 45000 },
    { name: 'All-Inclusive', transfers: 15, revenue: 52500 },
    { name: 'Intimate Ceremony', transfers: 12, revenue: 24000 }
  ];

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6">
        {/* Header with Tier Status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold">The Grand Estate</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Platinum Partner
              </span>
              <span className="text-sm text-gray-600">
                Next tier: 5 more transfers
              </span>
            </div>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded-lg px-3 py-1.5"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Revenue",
              value: "$48,920",
              change: "+15%",
              icon: DollarSign,
              color: "green"
            },
            {
              title: "Successful Transfers",
              value: "32",
              change: "+8%",
              icon: Calendar,
              color: "blue"
            },
            {
              title: "Average Time to Transfer",
              value: "12 days",
              change: "-2 days",
              icon: Clock,
              color: "purple"
            },
            {
              title: "Conversion Rate",
              value: "68%",
              change: "+5%",
              icon: TrendingUp,
              color: "rose"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{stat.value}</span>
                    <span className={`text-sm ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-rose-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Seasonality Chart */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-6">Seasonality Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonalityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="transfers" fill="#8b5cf6" name="Transfers" />
                  <Bar dataKey="directBookings" fill="#10b981" name="Direct Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Package Performance */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-6">Package Performance</h3>
            <div className="space-y-4">
              {popularPackages.map((pkg, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.transfers} transfers</p>
                      </div>
                      <span className="font-medium">${pkg.revenue.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 h-1 bg-gray-100 rounded-full">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(pkg.transfers / 24) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits & Rewards */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-semibold mb-6">Partner Benefits</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Tier Status</h4>
                  <p className="text-sm text-blue-600">Platinum</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Commission Rate</span>
                  <span className="font-medium">2.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Priority Support</span>
                  <span className="font-medium">24/7</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Current Perks</h4>
                  <p className="text-sm text-green-600">4 Active</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>Featured Listing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>Premium Analytics</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Customer Satisfaction</h4>
                  <p className="text-sm text-purple-600">4.8/5.0</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-medium">2.4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueAnalytics;

