'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Calendar, MapPin, Filter, LayoutGrid, ChevronDown, Check, X, Heart, DollarSign, Users, Clock, ArrowUpDown, Bookmark, Globe } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { 
  ssr: false,
  loading: () => <p>Loading...</p>
});

interface EnhancedSearchProps {
  initialSearchType: 'dates' | 'marketplace';
}

interface AdvancedFilters {
  venueType: string[];
  amenities: string[];
  priceRange: [number, number];
}

export default function EnhancedSearch({ initialSearchType }: EnhancedSearchProps) {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('September 2024');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [5000, 25000],
    guestCount: [50, 150],
    dateRange: { start: null, end: null },
    packageTypes: [],
    amenities: []
  });
  const [sortOption, setSortOption] = useState('relevance');
  const [searchType, setSearchType] = useState(initialSearchType);
  const [visibleResults, setVisibleResults] = useState(12);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
  venueType: [],
  amenities: [],
  priceRange: [0, 50000],
});

  const venueTypes = ['Indoor', 'Outdoor', 'Beach', 'Garden', 'Ballroom', 'Rustic'];
  const amenities = ['Catering', 'Bar Service', 'Parking', 'Wheelchair Accessible', 'Pet Friendly', 'Accommodation'];

  // Generate 24 mock results with added description points
  const mockResults = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Luxury Venue ${i + 1}`,
    location: 'San Francisco, CA',
    price: 15000 + (i * 1000),
    originalPrice: 22000 + (i * 1500),
    date: `2024-09-${(i % 30) + 1}`,
    guestCapacity: 150,
    image: `https://placehold.co/800x450/png?text=Luxury-Venue-${i + 1}`,
    description: [
      'Scenic views',
      'In-house catering',
      'Outdoor ceremony space',
      'Bridal suite'
    ]
  }));

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
        'San Francisco, CA',
        'Los Angeles, CA',
        'New York, NY',
        'Chicago, IL',
        'Miami, FL',
      ].filter(suggestion => 
        suggestion.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery]);

  const handleAdvancedFilterChange = (filterType: keyof AdvancedFilters, value: any) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
};

const handleFilterChange = (filter: string, value: any) => {
  setActiveFilters(prev => ({
    ...prev,
    [filter]: value
  }));
};

  const clearAllFilters = () => {
    setActiveFilters({
      priceRange: [0, 50000],
      guestCount: [0, 300],
      dateRange: { start: null, end: null },
      packageTypes: [],
      amenities: []
    });
  };

  const loadMoreListings = () => {
    setVisibleResults(prev => Math.min(prev + 12, mockResults.length));
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
  import('yet-another-react-lightbox/styles.css');
}, []);

return (
  <div className="min-h-screen bg-gray-50">
    <div className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4 flex gap-4">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 border rounded-lg"
                placeholder="Search locations or venues"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {suggestions.length > 0 && (
                <div 
                  className="absolute top-full left-0 right-0 bg-white border rounded-lg mt-1 shadow-lg"
                  role="listbox"
                  id="search-suggestions"
                >
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      role="option"
                      tabIndex={0}
                      aria-selected={false}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setSearchQuery(suggestion);
                          setSuggestions([]);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex-1">
              <input 
                type="text"
                value={selectedMonth}
                className="w-full p-3 pl-10 border rounded-lg cursor-pointer"
                placeholder="Select dates"
                onClick={() => setShowDatePicker(!showDatePicker)}
                readOnly
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {showDatePicker && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-64 overflow-y-auto z-50">
                  {/* Date picker implementation */}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </button>
            <button 
              onClick={() => setSavedSearch(!savedSearch)}
              className={`p-2 rounded-lg border ${savedSearch ? 'text-purple-600 border-purple-200 bg-purple-50' : 'text-gray-400 hover:border-gray-300'}`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="py-3 border-t flex items-center justify-between">
          <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2">
            <button 
              onClick={() => setShowFilters(true)}
              className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 flex items-center gap-1"
            >
              <Filter className="w-3 h-3" />
              All Filters
            </button>
            <div className="h-4 w-px bg-gray-200"></div>
            <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
              Under $15,000
            </button>
            <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
              All-Inclusive
            </button>
            <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
              Under 100 guests
            </button>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-sm text-gray-600 border rounded-lg px-2 py-1"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="date_newest">Date: Newest</option>
              <option value="popularity">Popularity</option>
            </select>
            <div className="h-4 w-px bg-gray-200"></div>
            <div className="flex border rounded-lg p-1">
              <button 
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode('map')}
              >
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {Object.entries(activeFilters).some(([key, value]) => 
          Array.isArray(value) ? value.length > 0 : value !== null
        ) && (
          <div className="py-3 border-t flex items-center gap-2 overflow-x-auto">
            {activeFilters.priceRange[0] > 0 && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                <span>${activeFilters.priceRange[0].toLocaleString()} - ${activeFilters.priceRange[1].toLocaleString()}</span>
                <button 
                  onClick={() => handleAdvancedFilterChange('priceRange', [0, 50000])}
                  className="ml-1 p-0.5 rounded-full hover:bg-gray-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <button 
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Add this section for advanced filters */}
    {showFilters && (
      <div className="bg-white border-t p-4">
        <h3 className="font-semibold mb-4">Advanced Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-2">Venue Type</h4>
            {venueTypes.map(type => (
              <label key={type} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={advancedFilters.venueType.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...advancedFilters.venueType, type]
                      : advancedFilters.venueType.filter(t => t !== type);
                    handleAdvancedFilterChange('venueType', newTypes);
                  }}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
          <div>
            <h4 className="font-medium mb-2">Amenities</h4>
            {amenities.map(amenity => (
              <label key={amenity} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={advancedFilters.amenities.includes(amenity)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...advancedFilters.amenities, amenity]
                      : advancedFilters.amenities.filter(a => a !== amenity);
                    handleAdvancedFilterChange('amenities', newAmenities);
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
              onChange={(e) => handleAdvancedFilterChange('priceRange', [0, parseInt(e.target.value)])}
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

    <div className="max-w-7xl mx-auto px-4 py-8">
      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mockResults.slice(0, visibleResults).map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
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
                    <div className="font-semibold">${item.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 line-through">${item.originalPrice.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{item.date}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{item.guestCapacity} guests</span>
                </div>
                <ul className="mt-3 space-y-1">
                  {item.description.map((point, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
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

      {visibleResults < mockResults.length && (
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
        slides={mockResults.map(item => ({ src: item.image }))}
      />
    )}
  </div>
);
}
