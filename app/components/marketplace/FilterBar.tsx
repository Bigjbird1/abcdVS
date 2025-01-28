import React, { useState } from "react";
import { Filter, ChevronDown, ArrowUpDown, X } from "lucide-react";

interface FilterBarProps {
  sizes: string[];
  conditions: string[];
  priceRanges: { label: string; range: [number, number] }[];
  sortOptions: { value: string; label: string }[];
  selectedSize: string | null;
  selectedCondition: string | null;
  priceRange: [number, number] | null;
  sortBy: string;
  onSizeChange: (size: string | null) => void;
  onConditionChange: (condition: string | null) => void;
  onPriceRangeChange: (range: [number, number] | null) => void;
  onSortChange: (sort: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sizes,
  conditions,
  priceRanges,
  sortOptions,
  selectedSize,
  selectedCondition,
  priceRange,
  sortBy,
  onSizeChange,
  onConditionChange,
  onPriceRangeChange,
  onSortChange,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  return (
    <div className="relative py-3 border-t flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Size Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("size")}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300 ${selectedSize ? "bg-gray-50" : ""}`}
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
                      onSizeChange(selectedSize === size ? null : size);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                      selectedSize === size ? "bg-gray-100" : ""
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
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300 ${priceRange ? "bg-gray-50" : ""}`}
          >
            Price Range
            <ChevronDown className="w-4 h-4" />
          </button>
          {activeDropdown === "price" && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onPriceRangeChange(
                        priceRange?.[0] === range.range[0] &&
                          priceRange?.[1] === range.range[1]
                          ? null
                          : range.range,
                      );
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                      priceRange?.[0] === range.range[0] &&
                      priceRange?.[1] === range.range[1]
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Condition Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("condition")}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300 ${selectedCondition ? "bg-gray-50" : ""}`}
          >
            Condition
            <ChevronDown className="w-4 h-4" />
          </button>
          {activeDropdown === "condition" && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
              <div className="p-2">
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => {
                      onConditionChange(
                        selectedCondition === condition ? null : condition,
                      );
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                      selectedCondition === condition ? "bg-gray-100" : ""
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sort Options */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("sort")}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort by: {sortOptions.find((opt) => opt.value === sortBy)?.label}
        </button>
        {activeDropdown === "sort" && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50">
            <div className="p-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                    sortBy === option.value ? "bg-gray-100" : ""
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
  );
};

export default FilterBar;
