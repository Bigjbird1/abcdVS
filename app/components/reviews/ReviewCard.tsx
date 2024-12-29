import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, MoreHorizontal, MessageSquare, CheckCircle, Shield } from 'lucide-react';

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

interface ReviewCardProps {
  review: Review;
  onReportReview: (review: Review) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onReportReview }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {renderStars(review.rating)}
            <h3 className="font-medium">{review.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{review.author}</span>
            {review.verified && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>Verified {review.type}</span>
              </div>
            )}
            <span>•</span>
            <span>{new Date(review.date).toLocaleDateString()}</span>
          </div>
        </div>
        <button 
          onClick={() => onReportReview(review)}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {review.images && (
        <div className="flex gap-2 mb-4">
          {review.images.map((image, index) => (
            <div key={index} className="w-20 h-20 rounded-lg overflow-hidden">
              <img 
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <p className="text-gray-600 mb-4">{review.content}</p>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <ThumbsUp className="w-4 h-4" />
          Helpful ({review.helpfulCount})
        </button>
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <MessageSquare className="w-4 h-4" />
          Reply
        </button>
      </div>

      {review.response && (
        <div className="mt-4 pl-4 border-l-2">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{review.response.author}</span>
            <span className="text-sm text-gray-600">
              {new Date(review.response.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600">{review.response.content}</p>
        </div>
      )}

      {showReplyForm && (
        <div className="mt-4 pl-4 border-l-2">
          <textarea
            placeholder="Write your response..."
            className="w-full p-3 border rounded-lg mb-2"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setShowReplyForm(false)}
              className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800">
              Submit Response
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;

