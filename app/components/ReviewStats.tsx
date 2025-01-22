import React from 'react';
import { Review, ReviewsData, TabType } from '../types/reviews';

export interface ReviewStatsProps {
  reviews: ReviewsData;
  activeTab: TabType;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ reviews, activeTab }) => {
  return (
    <div>
      <h2>Reviews for {activeTab}</h2>
      <p>Total reviews: {reviews[activeTab].length}</p>
    </div>
  );
};

export default ReviewStats; 