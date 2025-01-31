'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface SavedItem {
  id: string;
  itemId: string;
  userId: string;
  savedAt: string;
}

interface SavedItemsContextType {
  savedItems: SavedItem[];
  saveItem: (itemId: string) => Promise<void>;
  unsaveItem: (itemId: string) => Promise<void>;
  isSaved: (itemId: string) => boolean;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('saved_items')
      .select('*')
      .eq('userId', session.user.id);

    if (error) {
      console.error('Error loading saved items:', error);
      return;
    }

    setSavedItems(data || []);
  };

  const saveItem = async (itemId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Must be logged in to save items');
    }

    const newSavedItem = {
      itemId,
      userId: session.user.id,
      savedAt: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('saved_items')
      .insert([newSavedItem]);

    if (error) {
      console.error('Error saving item:', error);
      throw error;
    }

    await loadSavedItems();
  };

  const unsaveItem = async (itemId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('saved_items')
      .delete()
      .match({ itemId, userId: session.user.id });

    if (error) {
      console.error('Error removing saved item:', error);
      throw error;
    }

    await loadSavedItems();
  };

  const isSaved = (itemId: string) => {
    return savedItems.some(item => item.itemId === itemId);
  };

  return (
    <SavedItemsContext.Provider value={{
      savedItems,
      saveItem,
      unsaveItem,
      isSaved,
    }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}
