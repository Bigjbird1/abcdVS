const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://sbgdbsfwpjeuzvpuzqsh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2Ric2Z3cGpldXp2cHV6cXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDQ5OTAsImV4cCI6MjA1MzMyMDk5MH0.VX5XncLFLLfHU78un_bmU3So9G5peYlKKIvGMaebf_8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedTestData() {
  console.log('Seeding test data...\n');

  // Insert test item
  const { data: item, error: itemError } = await supabase
    .from('items')
    .insert([
      {
        title: 'Test Wedding Dress',
        description: 'Beautiful white wedding dress, perfect condition',
        category: 'dresses',
        price: 1000.00,
        size: 'M',
        condition: 'like-new',
        location: 'New York, NY'
      }
    ])
    .select()
    .single();

  if (itemError) {
    console.error('Error inserting test item:', itemError);
    return;
  }

  console.log('Test item inserted:', item);

  // The search_index should be automatically updated via the trigger we created
  console.log('\nChecking search index...');
  const { data: searchIndex, error: searchError } = await supabase
    .from('search_index')
    .select('*')
    .eq('item_id', item.id)
    .single();

  if (searchError) {
    console.error('Error checking search index:', searchError);
    return;
  }

  console.log('Search index entry:', searchIndex);
}

seedTestData().catch(console.error);
