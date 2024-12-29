import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="flex items-center gap-4 py-3 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === category.id
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;

