export type Review = {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  reported?: boolean;
};

export type ReviewsData = {
  venue: Review[];
  food: Review[];
  music: Review[];
};

export type TabType = keyof ReviewsData; 