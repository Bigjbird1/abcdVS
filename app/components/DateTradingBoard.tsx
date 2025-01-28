"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeftRight,
  Shield,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const DateTradingBoard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("available");
  const [showProposalForm, setShowProposalForm] = useState(false);

  // Demo data
  const tradingPosts = [
    {
      id: "venue-1",
      currentDate: "2024-09-24",
      desiredDateRange: ["2024-10", "2024-12"],
      venue: "The Grand Estate",
      location: "San Francisco, CA",
      packageValue: 15000,
      flexibility: "±2 months",
      reason: "Seeking winter date",
    },
    {
      id: "venue-2",
      currentDate: "2024-08-15",
      desiredDateRange: ["2024-07", "2024-08"],
      venue: "Crystal Gardens",
      location: "Chicago, IL",
      packageValue: 18000,
      flexibility: "±1 month",
      reason: "Need earlier date",
    },
  ];

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Date Trading Board</h2>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Post Your Date
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeTab === "available"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Available for Trade
          </button>
          <button
            onClick={() => setActiveTab("matches")}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeTab === "matches"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Potential Matches
          </button>
        </div>

        <Alert>
          <Shield className="w-4 h-4" />
          <AlertDescription>
            All trades are protected by our secure transfer guarantee. We'll
            help facilitate the exchange.
          </AlertDescription>
        </Alert>
      </div>

      <div className="divide-y">
        {tradingPosts.map((post) => (
          <div 
            key={post.id} 
            className="p-6 cursor-pointer hover:bg-gray-50"
            onClick={() => router.push(`/listing/${post.id}`)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Current: {post.currentDate}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    Desired: {post.desiredDateRange[0]} to{" "}
                    {post.desiredDateRange[1]}
                  </div>
                </div>

                <h3 className="font-medium mb-1">{post.venue}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {post.location}
                  </div>
                  <span>
                    Package Value: ${post.packageValue.toLocaleString()}
                  </span>
                  <span>Flexibility: {post.flexibility}</span>
                </div>
              </div>

              <button
                onClick={() => setShowProposalForm(true)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Propose Trade
              </button>
            </div>

            {post.reason && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <strong>Reason for trade:</strong> {post.reason}
              </div>
            )}
          </div>
        ))}
      </div>

      {showProposalForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Propose Date Trade</h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="currentDate"
                  className="block text-sm font-medium mb-1"
                >
                  Your Current Date
                </label>
                <input
                  type="date"
                  id="currentDate"
                  name="currentDate"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium mb-1"
                >
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your venue name"
                />
              </div>

              <div>
                <label
                  htmlFor="packageValue"
                  className="block text-sm font-medium mb-1"
                >
                  Package Value
                </label>
                <input
                  type="number"
                  id="packageValue"
                  name="packageValue"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter package value"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Add any additional details..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowProposalForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                  Send Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTradingBoard;
