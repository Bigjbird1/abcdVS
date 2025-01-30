-- Enable uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the items table first
CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    size TEXT,
    condition TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Drop existing search_index table and related objects
DROP TRIGGER IF EXISTS update_search_index_trigger ON public.items;
DROP FUNCTION IF EXISTS public.update_search_index();
DROP TABLE IF EXISTS public.search_index;

-- Recreate search_index table
CREATE TABLE public.search_index (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    size TEXT,
    condition TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(category, '')), 'C') ||
        setweight(to_tsvector('english', coalesce(condition, '')), 'D') ||
        setweight(to_tsvector('english', coalesce(location, '')), 'D')
    ) STORED
);

-- Recreate indexes
CREATE INDEX IF NOT EXISTS search_index_vector_idx ON public.search_index USING GiST (search_vector);
CREATE INDEX IF NOT EXISTS search_index_category_idx ON public.search_index (category);
CREATE INDEX IF NOT EXISTS search_index_price_idx ON public.search_index (price);
CREATE INDEX IF NOT EXISTS search_index_condition_idx ON public.search_index (condition);
CREATE INDEX IF NOT EXISTS search_index_created_at_idx ON public.search_index (created_at);

-- Recreate update function
CREATE OR REPLACE FUNCTION public.update_search_index()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.search_index (
        item_id,
        title,
        description,
        category,
        price,
        size,
        condition,
        location,
        created_at
    )
    VALUES (
        NEW.id,
        NEW.title,
        NEW.description,
        NEW.category,
        NEW.price,
        NEW.size,
        NEW.condition,
        NEW.location,
        NEW.created_at
    )
    ON CONFLICT (item_id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        price = EXCLUDED.price,
        size = EXCLUDED.size,
        condition = EXCLUDED.condition,
        location = EXCLUDED.location,
        created_at = EXCLUDED.created_at;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
CREATE TRIGGER update_search_index_trigger
AFTER INSERT OR UPDATE ON public.items
FOR EACH ROW
EXECUTE FUNCTION update_search_index();

-- Set up RLS policies
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_index ENABLE ROW LEVEL SECURITY;

-- Allow public read access to search_index
CREATE POLICY search_index_select_policy ON public.search_index
    FOR SELECT
    TO public
    USING (true);

-- Allow public read access to items
CREATE POLICY items_select_policy ON public.items
    FOR SELECT
    TO public
    USING (true);

-- Sync existing items to search_index
INSERT INTO public.search_index (
    item_id,
    title,
    description,
    category,
    price,
    size,
    condition,
    location,
    created_at
)
SELECT
    id,
    title,
    description,
    category,
    price,
    size,
    condition,
    location,
    created_at
FROM public.items
ON CONFLICT (item_id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    size = EXCLUDED.size,
    condition = EXCLUDED.condition,
    location = EXCLUDED.location,
    created_at = EXCLUDED.created_at;

-- Recreate the search function
DROP FUNCTION IF EXISTS public.search_items;
CREATE OR REPLACE FUNCTION public.search_items(
  search_query TEXT,
  category TEXT,
  size TEXT,
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
      AND (category IS NULL OR si.category = category)
      AND (size IS NULL OR si.size = size)
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
