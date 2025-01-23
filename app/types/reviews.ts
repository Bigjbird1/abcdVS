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
  response?: {
    author: string;
    content: string;
    date: string;
  };
  images?: string[];
}

export type TabType = 'venue' | 'food' | 'music';

export interface ReviewsData {
  venue: Review[];
  food: Review[];
  music: Review[];
} 