import React from 'react';
import { Star } from 'lucide-react';

const ReviewStats = () => {
  const renderStars = (rating) => {
    return (
      <div className="flex justify-center mb-1">
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
    <div className="bg-white rounded-xl border p-6 mb-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-semibold">4.8</div>
          {renderStars(5)}
          <div className="text-sm text-gray-600">Overall Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-semibold">95%</div>
          <div className="text-sm text-gray-600">Verified Reviews</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-semibold">127</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-semibold">92%</div>
          <div className="text-sm text-gray-600">Response Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;

