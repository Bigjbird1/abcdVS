"use client";

import React, { useState } from 'react';
import { Search, BookmarkPlus, History, X, Filter } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import { SavedSearch } from '../../context/SearchContext';

export default function AdvancedSearch() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    savedSearches,
    saveSearch,
    deleteSavedSearch,
    applySavedSearch,
    searchHistory,
    clearSearchHistory
  } = useSearch();

  const { user } = useAuth();
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleSaveSearch = async () => {
    if (!searchName.trim()) return;
    await saveSearch(searchName);
    setSearchName('');
    setShowSavedSearches(false);
  };

  const handleApplySavedSearch = (savedSearch: SavedSearch) => {
    applySavedSearch(savedSearch);
    setShowSavedSearches(false);
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    setShowHistory(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wedding items..."
            className="w-full px-4 py-3 pl-12 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {user && (
            <button
              onClick={() => setShowSavedSearches(!showSavedSearches)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Saved Searches"
            >
              <BookmarkPlus className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Search History"
          >
            <History className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`p-2 hover:bg-gray-100 rounded-full ${
              showAdvancedFilters ? 'bg-gray-100' : ''
            }`}
            title="Advanced Filters"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Saved Searches Dropdown */}
      {showSavedSearches && user && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Saved Searches</h3>
            
            {/* Save New Search */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Name this search"
                className="flex-1 px-3 py-2 border rounded"
              />
              <button
                onClick={handleSaveSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>

            {/* Saved Searches List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <button
                    onClick={() => handleApplySavedSearch(search)}
                    className="flex-1 text-left"
                  >
                    <div className="font-medium">{search.name}</div>
                    <div className="text-sm text-gray-500">{search.query}</div>
                  </button>
                  <button
                    onClick={() => deleteSavedSearch(search.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Searches</h3>
              <button
                onClick={clearSearchHistory}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchHistory.map((query: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(query)}
                  className="w-full text-left p-2 hover:bg-gray-50 rounded"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Advanced Filters</h3>
            
            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 px-3 py-2 border rounded"
                  value={filters.priceRange?.[0] || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: [Number(e.target.value), filters.priceRange?.[1] || Infinity]
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 px-3 py-2 border rounded"
                  value={filters.priceRange?.[1] === Infinity ? '' : filters.priceRange?.[1]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value)]
                    })
                  }
                />
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Size</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.size || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    size: e.target.value || null
                  })
                }
              >
                <option value="">Any Size</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.condition || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    condition: e.target.value || null
                  })
                }
              >
                <option value="">Any Condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value
                  })
                }
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
