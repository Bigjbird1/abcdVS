import React, { useEffect, useState } from 'react';
import { useSavedItems } from '../../context/SavedItemsContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface SavedItem {
  id: string;
  itemId: string;
  userId: string;
  savedAt: string;
}

interface ListingDetails {
  id: string;
  title: string;
  date: string;
  price: number;
  venue?: string;
}

export const WishlistComponent = () => {
  const { savedItems, unsaveItem } = useSavedItems();
  const [listingDetails, setListingDetails] = useState<Record<string, ListingDetails>>({});
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchListingDetails = async () => {
      const itemIds = savedItems.map(item => item.itemId);
      if (itemIds.length === 0) return;

      const { data, error } = await supabase
        .from('listings')
        .select('id, title, date, price, venue')
        .in('id', itemIds);

      if (error) {
        console.error('Error fetching listing details:', error);
        return;
      }

      const detailsMap = (data || []).reduce((acc, item) => ({
        ...acc,
        [item.id]: item
      }), {});

      setListingDetails(detailsMap);
    };

    fetchListingDetails();
  }, [savedItems]);

  const handleRemove = async (itemId: string) => {
    try {
      await unsaveItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!savedItems || savedItems.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Wishlist</h3>
        <p className="text-gray-500">No items saved yet. Browse our listings to add some!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Wishlist</h3>
      <div className="space-y-4">
        {savedItems.map((item) => {
          const details = listingDetails[item.itemId];
          if (!details) return null;

          return (
            <div 
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{details.title}</h4>
                <div className="text-sm text-gray-600 mt-1">
                  <p>Date: {new Date(details.date).toLocaleDateString()}</p>
                  {details.venue && <p>Venue: {details.venue}</p>}
                  <p>Price: ${details.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRemove(item.itemId)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
                <a
                  href={`/listing/${item.itemId}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                >
                  View Details
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistComponent;
