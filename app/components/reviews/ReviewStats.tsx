import React from 'react';
import { ReviewsData, TabType } from '@/types/reviews';

interface ReviewStatsProps {
  reviews: ReviewsData;
  activeTab: TabType;
}

// Change to default export to match the import in page.tsx
export default function ReviewStats({ reviews, activeTab }: ReviewStatsProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Review Statistics</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Total {activeTab} Reviews: {reviews[activeTab].length}</p>
      </div>
    </div>
  );
}