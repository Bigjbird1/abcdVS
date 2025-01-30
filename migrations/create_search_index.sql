-- Create the search_index table with proper indexing
CREATE TABLE IF NOT EXISTS public.search_index (
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

-- Create GiST index for faster full-text search
CREATE INDEX IF NOT EXISTS search_index_vector_idx ON public.search_index USING GiST (search_vector);

-- Create indexes for common filter columns
CREATE INDEX IF NOT EXISTS search_index_category_idx ON public.search_index (category);
CREATE INDEX IF NOT EXISTS search_index_price_idx ON public.search_index (price);
CREATE INDEX IF NOT EXISTS search_index_condition_idx ON public.search_index (condition);
CREATE INDEX IF NOT EXISTS search_index_created_at_idx ON public.search_index (created_at);

-- Create function to update search index
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
    location
  )
  VALUES (
    NEW.id,
    NEW.title,
    NEW.description,
    NEW.category,
    NEW.price,
    NEW.size,
    NEW.condition,
    NEW.location
  )
  ON CONFLICT (item_id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    size = EXCLUDED.size,
    condition = EXCLUDED.condition,
    location = EXCLUDED.location;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search index
CREATE TRIGGER update_search_index_trigger
AFTER INSERT OR UPDATE ON public.items
FOR EACH ROW
EXECUTE FUNCTION update_search_index();
