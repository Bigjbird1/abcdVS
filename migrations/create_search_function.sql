-- Create the search function that uses weighted ranking
CREATE OR REPLACE FUNCTION public.search_items(
  search_query TEXT,
  input_category TEXT,
  input_size TEXT,
  condition TEXT,
  min_price DECIMAL,
  max_price DECIMAL,
  sort_by TEXT
)
RETURNS TABLE (
  id UUID,
  item_id UUID,
  title TEXT,
  description TEXT,
  category TEXT,
  price DECIMAL,
  size TEXT,
  condition TEXT,
  location TEXT,
  created_at TIMESTAMPTZ,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  WITH ranked_results AS (
    SELECT 
      si.*,
      CASE 
        WHEN search_query IS NULL OR search_query = '' THEN 0
        ELSE ts_rank(
          search_vector,
          websearch_to_tsquery('english', search_query),
          32 -- Normalization option: divide rank by document length
        )
      END as rank
    FROM public.search_index si
    WHERE
      -- Apply text search if query exists
      (search_query IS NULL OR search_query = '' OR
       search_vector @@ websearch_to_tsquery('english', search_query))
      -- Apply filters
      AND (input_category IS NULL OR si.category = input_category)
      AND (input_size IS NULL OR si.size = input_size)
      AND (condition IS NULL OR si.condition = condition)
      AND (min_price IS NULL OR si.price >= min_price)
      AND (max_price IS NULL OR si.price <= max_price)
  )
  SELECT *
  FROM ranked_results
  ORDER BY
    CASE 
      WHEN sort_by = 'price-asc' THEN price
    END ASC NULLS LAST,
    CASE 
      WHEN sort_by = 'price-desc' THEN price
    END DESC NULLS LAST,
    CASE 
      WHEN sort_by = 'newest' THEN created_at
    END DESC NULLS LAST,
    CASE 
      -- For 'featured' or when no sort specified, use search rank and recency
      WHEN sort_by = 'featured' OR sort_by IS NULL THEN 
        rank * (1 + 1.0 / (EXTRACT(EPOCH FROM NOW() - created_at) / 86400.0 + 1))
    END DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql;
