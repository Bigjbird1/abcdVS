export interface ReviewResponse {
  author: string;
  content: string;
  date: string;
}

export interface Review {
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
}

export type TabType = "venue" | "food" | "music" | "seller";

export interface ReviewsData {
  venue: Review[];
  food: Review[];
  music: Review[];
  seller: Review[];
}
