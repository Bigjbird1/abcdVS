export interface SearchResult {
  id: number;
  title: string;
  location: string;
  price: number;
  originalPrice: number;
  date: string;
  guestCapacity: number;
  image: string;
  description: string[];
}

export interface AdvancedFilters {
  venueType: string[];
  amenities: string[];
  priceRange: [number, number];
  categories?: string[];
  condition?: string[];
  sellerRating?: number;
  size?: string | null;
  sortBy: string;
}

export interface SearchModeConfig {
  placeholder: string;
  filters: string[];
  sortOptions: string[];
}

export type SearchType = "dates" | "marketplace";

export interface EnhancedSearchProps {
  initialSearchType: SearchType;
}

export interface SortOption {
  value: string;
  label: string;
}
