'use client'
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReviewStats from '../components/reviews/ReviewStats';
import ReviewFilters from '../components/reviews/ReviewFilters';
import ReviewList from '../components/reviews/ReviewList';
import ReportModal from '../components/reviews/ReportModal';
import { ErrorBoundary } from 'react-error-boundary';

// Define base types
type ReviewResponse = {
  author: string;
  content: string;
  date: string;
};

type Review = {
  id: number;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  type: string;
  response?: ReviewResponse;
  images?: string[];
};

type ReviewsData = {
  venue: Review[];
  seller: Review[];
  marketplace: Review[];
};

type TabType = keyof ReviewsData;

// Define component prop types
type ReviewFiltersProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

type ReviewListProps = {
  reviews: Review[];
  onReportReview: (review: Review) => void;
};

type ReportModalProps = {
  onClose: () => void;
  onSubmit: () => void;
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
  
  // Mock data with proper typing
  const reviews: ReviewsData = {
    venue: [
      {
        id: 1,
        rating: 5,
        title: "Excellent transfer experience",
        content: "The venue was extremely helpful in facilitating the transfer. They made the process smooth and were very communicative throughout.",
        author: "Sarah M.",
        date: "2024-02-15",
        verified: true,
        helpfulCount: 12,
        type: "transfer",
        response: {
          author: "The Grand Estate",
          content: "Thank you for the wonderful review, Sarah! We're glad we could help make the transfer process smooth.",
          date: "2024-02-16"
        }
      },
      {
        id: 2,
        rating: 4,
        title: "Good but some delays",
        content: "Transfer went through successfully but took longer than expected. Communication could have been better.",
        author: "Michael R.",
        date: "2024-02-10",
        verified: true,
        helpfulCount: 8,
        type: "transfer"
      }
    ],
    seller: [
      {
        id: 3,
        rating: 5,
        title: "Great seller, very responsive",
        content: "Emma was super helpful and provided all the necessary documentation quickly. Would definitely recommend!",
        author: "David L.",
        date: "2024-02-18",
        verified: true,
        helpfulCount: 15,
        type: "seller"
      }
    ],
    marketplace: [
      {
        id: 4,
        rating: 5,
        title: "Perfect condition dress",
        content: "The dress was exactly as described and in perfect condition. Seller was great with communication.",
        author: "Lisa K.",
        date: "2024-02-20",
        verified: true,
        helpfulCount: 10,
        type: "product",
        images: ["/placeholder.svg?height=400&width=400&text=Wedding-Dress-1"]
      }
    ]
  };

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
          onReportReview={handleReportReview}
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

export default ReviewsSystem;

