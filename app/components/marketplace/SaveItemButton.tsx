'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useSavedItems } from '../../context/SavedItemsContext';

interface SaveItemButtonProps {
  itemId: string;
  className?: string;
}

export default function SaveItemButton({ itemId, className = '' }: SaveItemButtonProps) {
  const { isSaved, saveItem, unsaveItem } = useSavedItems();
  const saved = isSaved(itemId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent event bubbling if used in a card
    try {
      if (saved) {
        await unsaveItem(itemId);
      } else {
        await saveItem(itemId);
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Must be logged in to save items') {
        // TODO: Show login modal
        console.error('User must be logged in to save items');
      } else {
        console.error('Error toggling save status:', error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
        saved ? 'text-red-500' : 'text-gray-500'
      } ${className}`}
      aria-label={saved ? 'Remove from saved items' : 'Save item'}
    >
      <Heart
        className={`w-6 h-6 ${saved ? 'fill-current' : ''}`}
      />
    </button>
  );
}
