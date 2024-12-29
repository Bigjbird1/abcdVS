import React from 'react';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Overview', 'Listings', 'Messages', 'Analytics'];

  return (
    <div className="flex gap-6 px-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`py-4 px-2 -mb-px font-medium ${
            activeTab === tab.toLowerCase()
              ? 'border-b-2 border-gray-900 text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabs;

