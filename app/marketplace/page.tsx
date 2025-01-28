"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter, Heart, ChevronDown, ArrowUpDown } from "lucide-react";
import FeaturedCollections from "../components/marketplace/FeaturedCollections";
import CategoryNavigation from "../components/marketplace/CategoryNavigation";
import FilterBar from "../components/marketplace/FilterBar";
import ItemGrid from "../components/marketplace/ItemGrid";

const MarketplaceBrowse = () => {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null,
  );
  const [sortBy, setSortBy] = useState("featured");

  // Available filter options
  const sizes = ["4", "6", "7", "8", "M", "40R", "Various"];
  const conditions = [
    "New",
    "Like New",
    "Excellent",
    "Good",
    "Made to Order",
    "Custom Made",
    "Handmade",
  ];
  const priceRanges: { label: string; range: [number, number] }[] = [
    { label: "Under $100", range: [0, 100] },
    { label: "$100 - $500", range: [100, 500] },
    { label: "$500 - $1000", range: [500, 1000] },
    { label: "Over $1000", range: [1000, Infinity] },
  ];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
  ];

  // Clear all filters
  const clearFilters = () => {
    setSelectedSize(null);
    setPriceRange(null);
    setSelectedCondition(null);
    setSortBy("featured");
  };

  // Active filters for pills
  const activeFilters = useMemo(() => {
    const filters = [];
    if (selectedSize) filters.push({ type: "size", value: selectedSize });
    if (priceRange) {
      const rangeLabel = priceRanges.find(
        (r) => r.range[0] === priceRange[0] && r.range[1] === priceRange[1],
      )?.label;
      filters.push({
        type: "price",
        value: rangeLabel || `$${priceRange[0]} - $${priceRange[1]}`,
      });
    }
    if (selectedCondition)
      filters.push({ type: "condition", value: selectedCondition });
    return filters;
  }, [selectedSize, priceRange, selectedCondition]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "dresses", name: "Wedding Dresses" },
    { id: "accessories", name: "Accessories" },
    { id: "decor", name: "Decor" },
    { id: "shoes", name: "Shoes" },
    { id: "veils", name: "Veils & Headpieces" },
    { id: "jewelry", name: "Jewelry" },
  ];

  const loadMoreItems = () => {
    setVisibleItems((prevVisible) => prevVisible + 8);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Search */}
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search wedding items..."
                className="w-full border rounded-lg pl-10 pr-4 py-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <CategoryNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <FilterBar
            sizes={sizes}
            conditions={conditions}
            priceRanges={priceRanges}
            sortOptions={sortOptions}
            selectedSize={selectedSize}
            selectedCondition={selectedCondition}
            priceRange={priceRange}
            sortBy={sortBy}
            onSizeChange={setSelectedSize}
            onConditionChange={setSelectedCondition}
            onPriceRangeChange={setPriceRange}
            onSortChange={setSortBy}
          />

          {/* Active Filter Pills */}
          {activeFilters.length > 0 && (
            <div className="py-3 flex items-center gap-2 border-t">
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
                >
                  <span>{filter.value}</span>
                  <button
                    onClick={() => {
                      switch (filter.type) {
                        case "size":
                          setSelectedSize(null);
                          break;
                        case "price":
                          setPriceRange(null);
                          break;
                        case "condition":
                          setSelectedCondition(null);
                          break;
                      }
                    }}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FeaturedCollections />
        <ItemGrid
          visibleItems={visibleItems}
          selectedSize={selectedSize}
          selectedCondition={selectedCondition}
          priceRange={priceRange}
          sortBy={sortBy}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />

        {/* Load More */}
        {visibleItems < 24 && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMoreItems}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Load more items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceBrowse;
