"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase-utils';

interface SearchFilters {
  category: string;
  size: string | null;
  condition: string | null;
  priceRange: [number, number] | null;
  sortBy: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchFilters;
  created_at: string;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  savedSearches: SavedSearch[];
  saveSearch: (name: string) => Promise<void>;
  deleteSavedSearch: (id: string) => Promise<void>;
  applySavedSearch: (savedSearch: SavedSearch) => void;
  searchHistory: string[];
  clearSearchHistory: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    size: null,
    condition: null,
    priceRange: null,
    sortBy: 'featured'
  });
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load saved searches from Supabase
  useEffect(() => {
    if (user) {
      loadSavedSearches();
    }
  }, [user]);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Load filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('marketplaceFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('marketplaceFilters', JSON.stringify(filters));
  }, [filters]);

  // Save search history to localStorage
  useEffect(() => {
    if (searchQuery.trim()) {
      const updatedHistory = [searchQuery, ...searchHistory.slice(0, 9)];
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  }, [searchQuery]);

  const loadSavedSearches = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading saved searches:', error);
      return;
    }

    setSavedSearches(data || []);
  };

  const saveSearch = async (name: string) => {
    if (!user) return;

    const newSearch = {
      user_id: user.id,
      name,
      query: searchQuery,
      filters,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('saved_searches')
      .insert([newSearch]);

    if (error) {
      console.error('Error saving search:', error);
      throw error;
    }

    await loadSavedSearches();
  };

  const deleteSavedSearch = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting saved search:', error);
      throw error;
    }

    setSavedSearches(savedSearches.filter(search => search.id !== id));
  };

  const applySavedSearch = (savedSearch: SavedSearch) => {
    setSearchQuery(savedSearch.query);
    setFilters(savedSearch.filters);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <SearchContext.Provider
      value={{
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
