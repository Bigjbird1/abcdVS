"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardTabs from "../components/dashboard/DashboardTabs";
import ActiveListings from "../components/dashboard/ActiveListings";
import SavedSearches from "../components/dashboard/SavedSearches";
import RecentMessages from "../components/dashboard/RecentMessages";
import Analytics from "../components/dashboard/Analytics";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <DashboardStats userType={user?.userType} />
        <div className="bg-white rounded-xl border mt-8">
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <ActiveListings userType={user?.userType} />
                <SavedSearches userType={user?.userType} />
                <RecentMessages />
              </div>
            )}
            {activeTab === "listings" && (
              <ActiveListings userType={user?.userType} />
            )}
            {activeTab === "messages" && <RecentMessages />}
            {activeTab === "analytics" && (
              <Analytics userType={user?.userType} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
