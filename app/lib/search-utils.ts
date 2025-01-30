import { supabase } from './supabase-utils';
import { PostgrestError } from '@supabase/supabase-js';

const MAX_RETRIES = 3;
const TIMEOUT_MS = 10000;

export interface SearchIndexItem {
  id: string;
  item_id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  size: string | null;
  condition: string;
  location: string;
  created_at: string;
}

export interface SearchFilters {
  category?: string;
  size?: string | null;
  condition?: string | null;
  priceRange?: [number, number] | null;
  sortBy?: string;
}

function validateSearchParams(query: string, filters?: SearchFilters) {
  if (query && typeof query !== 'string') {
    throw new Error('Search query must be a string');
  }
  
  if (filters?.priceRange) {
    const [min, max] = filters.priceRange;
    if (min < 0 || max < 0) {
      throw new Error('Price range values must be non-negative');
    }
    if (min > max) {
      throw new Error('Minimum price cannot be greater than maximum price');
    }
  }
}

async function executeWithRetry<T>(
  operation: () => Promise<{ data: T[]; error: PostgrestError | null }>,
  retries = MAX_RETRIES
): Promise<{ data: T[]; error: PostgrestError | null }> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), TIMEOUT_MS);
      });
      
      const operationPromise = operation();
      const result = await Promise.race([operationPromise, timeoutPromise]) as { data: T[]; error: PostgrestError | null };
      if (result.error) {
        if (attempt === retries) {
          throw new Error(`Operation failed after ${retries} attempts: ${result.error.message}`);
        }
        console.warn(`Attempt ${attempt} failed, retrying...`, result.error);
        await new Promise(resolve => setTimeout(resolve, Math.min(1000 * attempt, 3000)));
        continue;
      }
      return result;
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      console.warn(`Attempt ${attempt} failed, retrying...`, err);
      await new Promise(resolve => setTimeout(resolve, Math.min(1000 * attempt, 3000)));
    }
  }
  throw new Error('Unexpected error in retry logic');
}

export async function searchItems(
  query: string,
  filters?: SearchFilters
) {
  try {
    validateSearchParams(query, filters);
    
    const safeFilters = filters || {};
    console.log('Search parameters:', { query, filters: safeFilters });

    const rpcQuery = {
      search_query: query?.trim().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim() || '',
      category: safeFilters.category === 'all' ? null : safeFilters.category?.trim(),
      size: safeFilters.size?.trim() || null,
      condition: safeFilters.condition?.trim() || null,
      min_price: safeFilters.priceRange?.[0] || null,
      max_price: safeFilters.priceRange?.[1] === Infinity ? 999999999 : safeFilters.priceRange?.[1] || null,
      sort_by: safeFilters.sortBy?.trim() || 'featured'
    };

    console.log('Executing search with parameters:', rpcQuery);

    const { data, error } = await executeWithRetry(async () => {
      const { data, error } = await supabase.rpc('search_items', rpcQuery) as { data: SearchIndexItem[]; error: PostgrestError | null };
      return { data: data ?? [], error };
    });

    if (error) {
      throw error;
    }

    console.log(`Search completed successfully. Found ${data.length} results.`);
    return data;
  } catch (err) {
    console.error('Search error:', err);
    const errorMessage = err instanceof Error 
      ? err.message 
      : 'An unexpected error occurred while searching';
    throw new Error(`Search failed: ${errorMessage}. Please try again.`);
  }
}

// Function to update search index when items are created/updated
export async function updateSearchIndex(item: {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  size?: string;
  condition: string;
  location: string;
}) {
  const { error } = await supabase
    .from('search_index')
    .upsert({
      item_id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      price: item.price,
      size: item.size || null,
      condition: item.condition,
      location: item.location,
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error updating search index:', error);
    throw error;
  }
}

// Function to remove items from search index
export async function removeFromSearchIndex(itemId: string) {
  const { error } = await supabase
    .from('search_index')
    .delete()
    .eq('item_id', itemId);

  if (error) {
    console.error('Error removing from search index:', error);
    throw new Error(`Failed to remove item from search index: ${error.message}`);
  }
}
