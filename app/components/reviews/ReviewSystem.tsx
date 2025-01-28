"use client";
import React, { useState } from "react";
import { Star, ThumbsUp, Flag } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

// Define types
type ReviewResponse = {
  author: string;
  content: string;
  date: string;
};

type Review = {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
  helpfulCount: number;
  verified?: boolean;
  type?: string;
  response?: ReviewResponse;
  images?: string[];
};

type NewReview = {
  rating: number;
  content: string;
};

type ReviewSystemProps = {
  itemId: number;
  itemType: "venue" | "seller" | "marketplace";
};

// Error Fallback Component
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div className="p-4 rounded-md bg-red-50">
    <h2 className="text-lg font-semibold text-red-800">
      Something went wrong:
    </h2>
    <p className="text-red-600">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Try again
    </button>
  </div>
);

const ReviewSystem: React.FC<ReviewSystemProps> = ({ itemId, itemType }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      content:
        "The venue was extremely helpful in facilitating the transfer. They made the process smooth and were very communicative throughout.",
      date: "2024-02-15",
      verified: true,
      helpfulCount: 12,
      type: "transfer",
      response: {
        author: "The Grand Estate",
        content:
          "Thank you for the wonderful review, Sarah! We're glad we could help make the transfer process smooth.",
        date: "2024-02-16",
      },
    },
    {
      id: 2,
      author: "Michael R.",
      rating: 4,
      content:
        "Transfer went through successfully but took longer than expected. Communication could have been better.",
      date: "2024-02-10",
      verified: true,
      helpfulCount: 8,
      type: "transfer",
    },
  ]);

  const [newReview, setNewReview] = useState<NewReview>({
    rating: 0,
    content: "",
  });

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const review: Review = {
        id: reviews.length + 1,
        author: "Current User", // Would come from auth context in real app
        rating: newReview.rating,
        content: newReview.content,
        date: new Date().toISOString().split("T")[0],
        helpfulCount: 0,
        verified: true,
        type: itemType,
      };

      // In a real app, this would be an API call
      setReviews([...reviews, review]);
      setNewReview({ rating: 0, content: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error appropriately
    }
  };

  const handleReportReview = (review: Review) => {
    setSelectedReview(review);
    setShowReportModal(true);
  };

  const handleHelpful = async (reviewId: number) => {
    try {
      // In a real app, this would be an API call
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? { ...review, helpfulCount: review.helpfulCount + 1 }
            : review,
        ),
      );
    } catch (error) {
      console.error("Error updating helpful count:", error);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() =>
            interactive && setNewReview({ ...newReview, rating: star })
          }
          className={`${star <= rating ? "text-yellow-400" : "text-gray-300"} 
            ${interactive ? "hover:text-yellow-500" : ""}`}
          aria-label={`${star} stars`}
          disabled={!interactive}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.author}</p>
                    {review.verified && (
                      <span className="text-sm text-green-600">Verified</span>
                    )}
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>

              <p className="text-gray-700 mb-4">{review.content}</p>

              {review.response && (
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="font-medium text-sm">
                    {review.response.author}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {review.response.content}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {review.response.date}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpfulCount})
                </button>
                <button
                  onClick={() => handleReportReview(review)}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmitReview}
          className="mt-8 bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

          <div className="mb-4">
            <label htmlFor="rating-group" className="block mb-2">
              Rating
            </label>
            <div
              id="rating-group"
              className="flex gap-1"
              role="group"
              aria-label="Rating"
            >
              {renderStars(newReview.rating, true)}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="review-content" className="block mb-2">
              Your Review
            </label>
            <textarea
              id="review-content"
              rows={4}
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your experience..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={!newReview.rating || !newReview.content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default ReviewSystem;
