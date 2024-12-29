import React from 'react';
import { Filter, ChevronDown, ArrowUpDown } from 'lucide-react';

const FilterBar = () => {
  return (
    <div className="py-3 border-t flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
          Size
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
          Price Range
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
          Condition
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <button className="flex items-center gap-2 text-sm text-gray-600">
        <ArrowUpDown className="w-4 h-4" />
        Sort by: Featured
      </button>
    </div>
  );
};

export default FilterBar;

