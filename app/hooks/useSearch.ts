import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import type { SearchResult, AdvancedFilters } from '@/types/search';

const generateMockResults = (count: number): SearchResult[] => 
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Luxury Venue ${i + 1}`,
    location: "San Francisco, CA",
    price: 15000 + i * 1000,
    originalPrice: 22000 + i * 1500,
    date: `2024-09-${(i % 30) + 1}`,
    guestCapacity: 150,
    image: `https://placehold.co/800x450/png?text=Luxury-Venue-${i + 1}`,
    description: [
      "Scenic views",
      "In-house catering",
      "Outdoor ceremony space",
      "Bridal suite",
    ],
  }));

export const useSearch = (initialFilters: AdvancedFilters) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(initialFilters);
  const [results, setResults] = useState<SearchResult[]>(generateMockResults(24));
  const [isLoading, setIsLoading] = useState(true);
  const [visibleResults, setVisibleResults] = useState(12);

  const handleSearch = useCallback(async () => {
    try {
      let filteredResults: SearchResult[] = generateMockResults(24);

      // Filter by search query
      if (debouncedSearchQuery) {
        filteredResults = filteredResults.filter((item) =>
          item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );
      }

      // Apply size filter
      if (advancedFilters.size) {
        filteredResults = filteredResults.filter((item) => {
          const getSize = (capacity: number) => {
            if (capacity <= 50) return "Small";
            if (capacity <= 100) return "Medium";
            if (capacity <= 200) return "Large";
            return "Extra Large";
          };
          return getSize(item.guestCapacity) === advancedFilters.size;
        });
      }

      // Apply price range filter
      filteredResults = filteredResults.filter((item) => 
        item.price >= advancedFilters.priceRange[0] && 
        item.price <= advancedFilters.priceRange[1]
      );

      // Apply venue type filter
      if (advancedFilters.venueType.length > 0) {
        filteredResults = filteredResults.filter((item) =>
          advancedFilters.venueType.some(type => 
            item.description.some(desc => desc.toLowerCase().includes(type.toLowerCase()))
          )
        );
      }

      // Apply amenities filter
      if (advancedFilters.amenities.length > 0) {
        filteredResults = filteredResults.filter((item) =>
          advancedFilters.amenities.some(amenity => 
            item.description.some(desc => desc.toLowerCase().includes(amenity.toLowerCase()))
          )
        );
      }

      // Apply sorting
      filteredResults.sort((a, b) => {
        switch (advancedFilters.sortBy) {
          case 'price_low_high':
            return a.price - b.price;
          case 'price_high_low':
            return b.price - a.price;
          case 'newest':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          default:
            return 0;
        }
      });

      setResults(filteredResults);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, [debouncedSearchQuery, advancedFilters]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const loadMoreResults = () => {
    setVisibleResults((prev) => Math.min(prev + 12, results.length));
  };

  return {
    searchQuery,
    setSearchQuery,
    advancedFilters,
    setAdvancedFilters,
    results,
    isLoading,
    visibleResults,
    loadMoreResults,
  };
};
