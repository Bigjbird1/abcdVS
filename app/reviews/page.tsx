'use client'
import React, { useState } from 'react';
import { ReviewsData, TabType } from '@/types/reviews';
import ReviewStats from '@/components/reviews/ReviewStats';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewList from '@/components/reviews/ReviewList';

export default function Reviews() {
  const [activeTab, setActiveTab] = useState<TabType>('venue');
  const [reviews, setReviews] = useState<ReviewsData>({
    venue: [],
    seller: [],
    marketplace: []
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ReviewStats reviews={reviews} activeTab={activeTab} />
      <ReviewFilters activeTab={activeTab} setActiveTab={setActiveTab} />
      <ReviewList reviews={reviews[activeTab]} />
    </div>
  );
} 