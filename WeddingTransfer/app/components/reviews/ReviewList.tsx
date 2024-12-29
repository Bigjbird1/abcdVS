import React from 'react';
import ReviewCard from './ReviewCard';

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

interface ReviewListProps {
  reviews: Review[];
  onReportReview: (review: Review) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onReportReview }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} onReportReview={onReportReview} />
      ))}
    </div>
  );
};

export default ReviewList;

