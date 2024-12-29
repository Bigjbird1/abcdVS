import React from 'react';

interface ReviewFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => setActiveTab('venue')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeTab === 'venue'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Venue Reviews
      </button>
      <button
        onClick={() => setActiveTab('seller')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeTab === 'seller'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Seller Reviews
      </button>
      <button
        onClick={() => setActiveTab('marketplace')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          activeTab === 'marketplace'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Marketplace Reviews
      </button>
    </div>
  );
};

export default ReviewFilters;

