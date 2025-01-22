import React from 'react';

export type Review = {
  id: string;
  // ... other review properties
};

export type ReviewsData = {
  venue: Review[];
  food: Review[];
  music: Review[];
};

export type TabType = keyof ReviewsData;

export interface ReviewStatsProps {
  reviews: ReviewsData;
  activeTab: TabType;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ reviews, activeTab }) => {
  return (
    <div>
      {/* Your ReviewStats implementation */}
      <h2>Reviews for {activeTab}</h2>
      <p>Total reviews: {reviews[activeTab].length}</p>
    </div>
  );
};

export default ReviewStats; 