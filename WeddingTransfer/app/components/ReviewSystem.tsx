import React, { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
  helpfulCount: number;
}

interface ReviewSystemProps {
  itemId: number;
  itemType: 'venue' | 'seller';
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ itemId, itemType }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: 'John Doe',
      rating: 4,
      content: 'Great venue, beautiful location. The staff was very helpful.',
      date: '2023-06-15',
      helpfulCount: 5,
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 5,
      content: 'Absolutely perfect! Couldn\'t have asked for a better place for our wedding.',
      date: '2023-05-22',
      helpfulCount: 8,
    },
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    content: '',
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: reviews.length + 1,
      author: 'Current User', // In a real app, this would be the logged-in user's name
      rating: newReview.rating,
      content: newReview.content,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 0, content: '' });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold">{review.author}</p>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <p className="text-gray-700 mb-2">{review.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpfulCount})
              </button>
              <button className="flex items-center gap-1 hover:text-gray-700">
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitReview} className="mt-8 bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({ ...newReview, rating: star })}
                className={`${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="review-content" className="block mb-2">Your Review</label>
          <textarea
            id="review-content"
            rows={4}
            value={newReview.content}
            onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSystem;

