export type ReviewResponse = {
  author: string;
  content: string;
  date: string;
};

export type Review = {
  id: string;
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
  category?: string;
  reported?: boolean;
};

export type ReviewsData = {
  venue: Review[];
  food: Review[];
  music: Review[];
};

export type TabType = keyof ReviewsData; 