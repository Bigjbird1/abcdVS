'use client';

import React, { useEffect, useState } from 'react';
import { useSavedItems } from '../context/SavedItemsContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import SaveItemButton from '../components/marketplace/SaveItemButton';

interface Item {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function SavedItemsPage() {
  const { savedItems } = useSavedItems();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchItems = async () => {
      if (savedItems.length === 0) {
        setLoading(false);
        return;
      }

      const itemIds = savedItems.map(saved => saved.itemId);
      
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .in('id', itemIds);

      if (error) {
        console.error('Error fetching saved items:', error);
        setLoading(false);
        return;
      }

      setItems(data || []);
      setLoading(false);
    };

    fetchItems();
  }, [savedItems, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-8">Saved Items</h1>
          <div className="bg-white rounded-xl border p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't saved any items yet.</p>
            <Link 
              href="/marketplace" 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Saved Items</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/marketplace/listing/${item.id}`}>
                {item.image && (
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-48"
                    />
                    <div className="absolute top-2 right-2">
                      <SaveItemButton itemId={item.id} />
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-medium mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
