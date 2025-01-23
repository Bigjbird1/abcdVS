import React from 'react';
import { ReviewsData } from '@/types/reviews';  // Keep this one
// OR
// import { ReviewsData } from '../types/reviews';  // If using relative path

interface ReviewStatsProps {
  reviews: ReviewsData;
  activeTab: keyof ReviewsData;
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({ reviews, activeTab }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Review Statistics</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Total {activeTab} Reviews: {reviews[activeTab].length}</p>
      </div>
    </div>
  );
}; 