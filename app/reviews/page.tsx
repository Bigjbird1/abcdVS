'use client'
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ReviewsData, TabType, Review, ReviewResponse } from '../types/reviews';
import ReviewStats from '@/components/reviews/ReviewStats';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewList from '@/components/reviews/ReviewList';
import ReportModal from '@/components/reviews/ReportModal';
import { ErrorBoundary } from 'react-error-boundary';

// Keep only the component prop types
type ReviewFiltersProps = {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
};

// Add this type definition
type ReviewStatsProps = {
  reviews: ReviewsData;
  activeTab: keyof ReviewsData;
};

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="p-4 rounded-md bg-red-50">
      <h2 className="text-lg font-semibold text-red-800">Something went wrong:</h2>
      <p className="text-red-600">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
};

const ReviewsSystem = () => {
  const [activeTab, setActiveTab] = useState<TabType>('venue');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<ReviewsData>({
    venue: [],
    food: [],
    music: []
  });
  
  const handleReportReview = (review: Review) => {
    setSelectedReview(review);
    setShowReportModal(true);
  };

  const handleCloseModal = () => {
    setShowReportModal(false);
    setSelectedReview(null);
  };

  const handleSubmitReport = async () => {
    try {
      // Here you would handle the report submission
      // Add your API call or data handling logic
      
      handleCloseModal();
      // Optionally show a success message
    } catch (error) {
      console.error('Error submitting report:', error);
      // Optionally show an error message
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="max-w-3xl mx-auto p-6">
        <ReviewStats reviews={reviews} activeTab={activeTab} />
        <ReviewFilters 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ReviewList 
          reviews={reviews[activeTab]}
        />
        {showReportModal && (
          <ReportModal
            onClose={handleCloseModal}
            onSubmit={handleSubmitReport}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ReviewsSystem;

