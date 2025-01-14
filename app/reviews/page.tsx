'use client'
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReviewStats from '../components/reviews/ReviewStats';
import ReviewFilters from '../components/reviews/ReviewFilters';
import ReviewList from '../components/reviews/ReviewList';
import ReportModal from '../components/reviews/ReportModal';

// Define types for our review structure
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

// Define the structure of our reviews object
type ReviewsData = {
  venue: Review[];
  seller: Review[];
  marketplace: Review[];
};

// Define valid tab types
type TabType = keyof ReviewsData;

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ReviewStats />
      <ReviewFilters activeTab={activeTab} setActiveTab={setActiveTab} />
      <ReviewList 
        reviews={reviews[activeTab]} 
        onReportReview={handleReportReview}
      />
      {showReportModal && (
        <ReportModal
          onClose={() => {
            setShowReportModal(false);
            setSelectedReview(null);
          }}
          onSubmit={() => {
            setShowReportModal(false);
            setSelectedReview(null);
            // Here you would handle the report submission
          }}
        />
      )}
    </div>
  );
};

export default ReviewsSystem;

