import React from "react";
import { TabType } from "@/types/reviews";

interface ReviewFiltersProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function ReviewFilters({
  activeTab,
  setActiveTab,
}: ReviewFiltersProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setActiveTab("venue")}
        className={`px-4 py-2 rounded ${activeTab === "venue" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
      >
        Venue
      </button>
      <button
        onClick={() => setActiveTab("food")}
        className={`px-4 py-2 rounded ${activeTab === "food" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
      >
        Food
      </button>
      <button
        onClick={() => setActiveTab("music")}
        className={`px-4 py-2 rounded ${activeTab === "music" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
      >
        Music
      </button>
    </div>
  );
}
