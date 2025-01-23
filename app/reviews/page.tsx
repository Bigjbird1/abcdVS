'use client'
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ReviewsData, TabType, Review } from '@/types/reviews';
import { ReviewStats } from '@/components/ReviewStats';
import ReviewFilters from '../components/ReviewFilters';
import ReviewList from '../components/reviews/ReviewList';
import ReportModal from '@/components/reviews/ReportModal';
import { ErrorBoundary } from 'react-error-boundary';

// Add these type definitions at the top of the file with your other types
type ReviewStatsProps = {
  reviews: ReviewsData;
  activeTab: TabType;
};

type ReviewListProps = {
  reviews: Review[];
};

// You already have ReviewFiltersProps defined, but let's keep it for reference
type ReviewFiltersProps = {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
};

// Add these type definitions at the top of your file
type TabType = 'venue' | 'food' | 'music';

interface Review {
  id: number;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  type: string;
  response?: {
    author: string;
    content: string;
    date: string;
  };
  images?: string[];
}

interface ReviewsData {
  venue: Review[];
  food: Review[];
  music: Review[];
}

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
          onReportReview={(review) => {
            // Add your report handling logic here
            console.log('Report review:', review);
          }}
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

