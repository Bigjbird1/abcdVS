import React, { useState } from "react";
import { Bell, Search, ChevronDown, X } from "lucide-react";

const DashboardHeader = () => {
  const [showToast, setShowToast] = useState(true);

  return (
    <>
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              WeddingTransfer
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-900 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showToast && (
        <div className="fixed top-4 right-4 bg-green-50 rounded-lg p-4 flex items-start gap-3 shadow-lg max-w-sm">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-green-500" />
          </div>
          <p className="flex-1 text-sm">
            Your listing has been published successfully!
          </p>
          <button
            onClick={() => setShowToast(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
