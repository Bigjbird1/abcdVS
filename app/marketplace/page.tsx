'use client'

import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, ChevronDown, ArrowUpDown } from 'lucide-react';
import FeaturedCollections from '../components/marketplace/FeaturedCollections';
import CategoryNavigation from '../components/marketplace/CategoryNavigation';
import FilterBar from '../components/marketplace/FilterBar';
import ItemGrid from '../components/marketplace/ItemGrid';

const MarketplaceBrowse = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'dresses', name: 'Wedding Dresses' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'decor', name: 'Decor' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'veils', name: 'Veils & Headpieces' },
    { id: 'jewelry', name: 'Jewelry' }
  ];

  const loadMoreItems = () => {
    setVisibleItems(prevVisible => prevVisible + 8);
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

          <FilterBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FeaturedCollections />
        <ItemGrid visibleItems={visibleItems} />

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

