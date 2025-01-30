import React from 'react';
import { Filter, ChevronDown, ArrowUpDown } from 'lucide-react';
import type { AdvancedFilters, SortOption } from '@/types/search';

interface SearchFilterBarProps {
  advancedFilters: AdvancedFilters;
  onFilterChange: (filterType: keyof AdvancedFilters, value: any) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  activeDropdown: string | null;
  onToggleDropdown: (dropdown: string) => void;
}

const sizes = ["Small", "Medium", "Large", "Extra Large"];

const sortOptions: SortOption[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" }
];

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

export default function SearchFilterBar({
  advancedFilters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  activeDropdown,
  onToggleDropdown,
}: SearchFilterBarProps) {
  return (
    <div className="bg-white mb-6 px-4">
      <div className="relative py-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Size Filter */}
          <div className="relative">
            <button
              onClick={() => onToggleDropdown("size")}
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
                        onFilterChange("size", advancedFilters.size === size ? null : size);
                        onToggleDropdown("");
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
              onClick={() => onToggleDropdown("price")}
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
                      onFilterChange("priceRange", [0, parseInt(e.target.value)])
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
            onClick={onToggleFilters}
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
            onClick={() => onToggleDropdown("sort")}
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
                      onFilterChange("sortBy", option.value);
                      onToggleDropdown("");
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
                      onFilterChange("venueType", newTypes);
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
                        : advancedFilters.amenities.filter((a) => a !== amenity);
                      onFilterChange("amenities", newAmenities);
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
                  onFilterChange("priceRange", [0, parseInt(e.target.value)])
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
            onClick={onToggleFilters}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
