"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  MapPin,
  Filter,
  LayoutGrid,
  ChevronDown,
  Check,
  X,
  Heart,
  DollarSign,
  Users,
  Clock,
  ArrowUpDown,
  Bookmark,
  Globe,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface EnhancedSearchProps {
  initialSearchType: "dates" | "marketplace";
}

interface AdvancedFilters {
  venueType: string[];
  amenities: string[];
  priceRange: [number, number];
  categories?: string[];
  condition?: string[];
  sellerRating?: number;
  size?: string | null;
  sortBy: string;
}

interface SearchModeConfig {
  placeholder: string;
  filters: string[];
  sortOptions: string[];
}

export default function EnhancedSearch({
  initialSearchType,
}: EnhancedSearchProps): JSX.Element {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [homepageContent, setHomepageContent] = useState<
    "dates" | "marketplace"
  >(initialSearchType);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("September 2024");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [5000, 25000],
    guestCount: [50, 150],
    dateRange: { start: null, end: null },
    packageTypes: [],
    amenities: [],
  });
  const [sortOption, setSortOption] = useState("relevance");
  const [searchType, setSearchType] = useState(initialSearchType);

  const searchModes: Record<"dates" | "marketplace", SearchModeConfig> = {
    dates: {
      placeholder: "Search locations or venues",
      filters: [
        "priceRange",
        "guestCount",
        "dateRange",
        "packageTypes",
        "amenities",
      ],
      sortOptions: [
        "relevance",
        "price_low_high",
        "price_high_low",
        "date_newest",
        "popularity",
      ],
    },
    marketplace: {
      placeholder: "Search wedding items or services",
      filters: ["priceRange", "categories", "condition", "sellerRating"],
      sortOptions: [
        "relevance",
        "price_low_high",
        "price_high_low",
        "newest",
        "best_selling",
      ],
    },
  };
  const [visibleResults, setVisibleResults] = useState(12);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    venueType: [],
    amenities: [],
    priceRange: [0, 50000],
    size: null,
    sortBy: "relevance"
  });

  const sizes = ["Small", "Medium", "Large", "Extra Large"];
  const conditions = ["New", "Like New", "Good", "Fair"];
  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price_low_high", label: "Price: Low to High" },
    { value: "price_high_low", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" }
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  interface SearchResult {
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

  const venueTypes = [
    "Indoor",
    "Outdoor",
    "Beach",
    "Garden",
    "Ballroom",
    "Rustic",
  ];
  const amenities = [
    "Catering",
    "Bar Service",
    "Parking",
    "Wheelchair Accessible",
    "Pet Friendly",
    "Accommodation",
  ];

  // Generate 24 mock results with added description points
  const mockResults: SearchResult[] = Array.from({ length: 24 }, (_, i) => ({
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

  const [results, setResults] = useState<SearchResult[]>(mockResults);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      // Simulated API call for autocomplete
      const mockSuggestions = [
        "San Francisco, CA",
        "Los Angeles, CA",
        "New York, NY",
        "Chicago, IL",
        "Miami, FL",
      ].filter((suggestion) =>
        suggestion.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      );
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery]);

  const handleAdvancedFilterChange = (
    filterType: keyof AdvancedFilters,
    value: any,
  ) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleFilterChange = (filter: string, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      priceRange: [0, 50000],
      guestCount: [0, 300],
      dateRange: { start: null, end: null },
      packageTypes: [],
      amenities: [],
    });
  };

  const loadMoreListings = () => {
    setVisibleResults((prev) => Math.min(prev + 12, mockResults.length));
  };

  const toggleFavorite = useCallback((id: number) => {
    // In a real application, this would interact with a user's saved listings
    console.log(`Toggled favorite for listing ${id}`);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const CardSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[16/9] bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    import("yet-another-react-lightbox/styles.css");
  }, []);

  const handleSearch = async () => {
    try {
      let filteredResults: SearchResult[] = mockResults;

      // Filter by search query if present
      if (searchQuery) {
        filteredResults = filteredResults.filter((item: SearchResult) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply filters
      if (advancedFilters.size) {
        filteredResults = filteredResults.filter((item: SearchResult) => {
          // Map guest capacity to size categories
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
      filteredResults = filteredResults.filter((item: SearchResult) => 
        item.price >= advancedFilters.priceRange[0] && 
        item.price <= advancedFilters.priceRange[1]
      );

      // Apply venue type filter if any selected
      if (advancedFilters.venueType.length > 0) {
        filteredResults = filteredResults.filter((item: SearchResult) =>
          advancedFilters.venueType.some(type => 
            item.description.some((desc: string) => desc.toLowerCase().includes(type.toLowerCase()))
          )
        );
      }

      // Apply amenities filter if any selected
      if (advancedFilters.amenities.length > 0) {
        filteredResults = filteredResults.filter((item: SearchResult) =>
          advancedFilters.amenities.some(amenity => 
            item.description.some((desc: string) => desc.toLowerCase().includes(amenity.toLowerCase()))
          )
        );
      }

      // Apply sorting
      filteredResults.sort((a: SearchResult, b: SearchResult) => {
        switch (advancedFilters.sortBy) {
          case 'price_low_high':
            return a.price - b.price;
          case 'price_high_low':
            return b.price - a.price;
          case 'newest':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          default: // relevance - keep original order
            return 0;
        }
      });

      setResults(filteredResults);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Apply filters whenever they change
  useEffect(() => {
    handleSearch();
  }, [advancedFilters, debouncedSearchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {isTransitioning && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      )}
      {/* Filter Bar */}
      <div className="bg-white mb-6 px-4">
        <div className="relative py-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Size Filter */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("size")}
                className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300 ${
                  advancedFilters.size ? "bg-gray-50" : ""
                }`}
              >
                Size
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "size" && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setAdvancedFilters(prev => ({
                            ...prev,
                            size: prev.size === size ? null : size
                          }));
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                          advancedFilters.size === size ? "bg-gray-100" : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("price")}
                className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300`}
              >
                Price Range
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "price" && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={advancedFilters.priceRange[1]}
                      onChange={(e) =>
                        setAdvancedFilters(prev => ({
                          ...prev,
                          priceRange: [0, parseInt(e.target.value)]
                        }))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>$0</span>
                      <span>${advancedFilters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* More Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300 ${
                showFilters ? "bg-gray-50" : ""
              }`}
            >
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>

          {/* Sort Options */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("sort")}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort by: {sortOptions.find((opt) => opt.value === advancedFilters.sortBy)?.label}
            </button>
            {activeDropdown === "sort" && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setAdvancedFilters(prev => ({
                          ...prev,
                          sortBy: option.value
                        }));
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                        advancedFilters.sortBy === option.value ? "bg-gray-100" : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Click outside to close dropdowns */}
          {activeDropdown && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setActiveDropdown(null)}
            />
          )}
        </div>
      </div>

      {/* Advanced filters panel */}
      {showFilters && (
        <div className="bg-white border-t p-4">
          <h3 className="font-semibold mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Venue Type</h4>
              {venueTypes.map((type) => (
                <label key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={advancedFilters.venueType.includes(type)}
                    onChange={(e) => {
                      const newTypes = e.target.checked
                        ? [...advancedFilters.venueType, type]
                        : advancedFilters.venueType.filter((t) => t !== type);
                      handleAdvancedFilterChange("venueType", newTypes);
                    }}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
            <div>
              <h4 className="font-medium mb-2">Amenities</h4>
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={advancedFilters.amenities.includes(amenity)}
                    onChange={(e) => {
                      const newAmenities = e.target.checked
                        ? [...advancedFilters.amenities, amenity]
                        : advancedFilters.amenities.filter(
                            (a) => a !== amenity,
                          );
                      handleAdvancedFilterChange("amenities", newAmenities);
                    }}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
            <div>
              <h4 className="font-medium mb-2">Price Range</h4>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={advancedFilters.priceRange[1]}
                onChange={(e) =>
                  handleAdvancedFilterChange("priceRange", [
                    0,
                    parseInt(e.target.value),
                  ])
                }
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span>$0</span>
                <span>${advancedFilters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Apply Filters
          </button>
        </div>
      )}

      <div
        className="max-w-7xl mx-auto px-4 py-8 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {isLoading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {results
              .slice(0, visibleResults)
              .map((item: SearchResult, index: number) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
                  onClick={(e) => {
                    // Don't navigate if clicking the heart button or image (lightbox)
                    const target = e.target as HTMLElement;
                    if (!target.closest('button') && !target.closest('img')) {
                      router.push(`/listing/${item.id}`);
                    }
                  }}
                >
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="group-hover:scale-105 transition-transform duration-500 object-cover"
                      onClick={() => openLightbox(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <button
                        className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-black/30 rounded-full text-sm text-white backdrop-blur-sm">
                        32% off
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${item.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${item.originalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                        {item.date}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                        {item.guestCapacity} guests
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {item.description.map((point, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        )}

        {visibleResults < results.length && (
          <div className="mt-12 text-center">
            <button
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 inline-flex items-center gap-2"
              onClick={loadMoreListings}
            >
              Show more listings
            </button>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={mockResults.map((item) => ({ src: item.image }))}
        />
      )}
    </div>
  );
}
