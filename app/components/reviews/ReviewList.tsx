import React from "react";
import { Review } from "@/types/reviews";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">{review.title}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
