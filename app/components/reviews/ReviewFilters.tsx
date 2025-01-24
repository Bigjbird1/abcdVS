import React from 'react';
import { TabType } from '../types/reviews';

export interface ReviewFiltersProps {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <button onClick={() => setActiveTab('venue')}>Venue</button>
      <button onClick={() => setActiveTab('food')}>Food</button>
      <button onClick={() => setActiveTab('music')}>Music</button>
    </div>
  );
};

export default ReviewFilters; 