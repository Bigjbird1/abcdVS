import React from 'react';
import { Review } from '../types/reviews';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border p-4 rounded-lg">
          <h3 className="font-bold">{review.title}</h3>
          <div className="flex items-center gap-2">
            <span>{review.author}</span>
            <span>•</span>
            <span>{review.date}</span>
          </div>
          <p className="mt-2">{review.content}</p>
          <div className="mt-2">
            Rating: {review.rating}/5
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList; 