const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://sbgdbsfwpjeuzvpuzqsh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2Ric2Z3cGpldXp2cHV6cXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDQ5OTAsImV4cCI6MjA1MzMyMDk5MH0.VX5XncLFLLfHU78un_bmU3So9G5peYlKKIvGMaebf_8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSearchSetup() {
  console.log('Testing search setup...\n');
  let hasErrors = false;

  // Test 1: Check if items table exists and has correct structure
  console.log('1. Checking items table...');
  const { data: itemsTable, error: itemsError } = await supabase
    .from('items')
    .select('id, title, description, category, price, size, condition, location, created_at')
    .limit(1);

  if (itemsError) {
    console.error('❌ Items table error:', itemsError.message);
    hasErrors = true;
  } else {
    console.log('✅ Items table exists and has correct structure');
  }

  // Test 2: Check if search_index table exists and has correct structure
  console.log('\n2. Checking search_index table...');
  const { data: searchIndex, error: searchIndexError } = await supabase
    .from('search_index')
    .select('id, item_id, title, description, category, price, size, condition, location, created_at')
    .limit(1);

  if (searchIndexError) {
    console.error('❌ Search index table error:', searchIndexError.message);
    hasErrors = true;
  } else {
    console.log('✅ Search index table exists and has correct structure');
  }

  // Test 3: Test search functionality with various parameters
  console.log('\n3. Testing search functionality...');
  
  const searchTests = [
    {
      name: 'Basic empty search',
      params: {
        search_query: '',
        category: null,
        size: null,
        condition: null,
        min_price: null,
        max_price: null,
        sort_by: 'featured'
      }
    },
    {
      name: 'Search with query',
      params: {
        search_query: 'dress',
        category: null,
        size: null,
        condition: null,
        min_price: null,
        max_price: null,
        sort_by: 'featured'
      }
    },
    {
      name: 'Search with filters',
      params: {
        search_query: '',
        category: 'dresses',
        size: 'M',
        condition: 'like-new',
        min_price: 0,
        max_price: 2000,
        sort_by: 'price-asc'
      }
    }
  ];

  for (const test of searchTests) {
    const { data: searchResult, error: searchError } = await supabase
      .rpc('search_items', test.params);

    if (searchError) {
      console.error(`❌ ${test.name} failed:`, searchError.message);
      hasErrors = true;
    } else {
      console.log(`✅ ${test.name} succeeded`);
      if (searchResult) {
        console.log(`  Found ${searchResult.length} results`);
      }
    }
  }

  // Test 4: Test trigger functionality
  console.log('\n4. Testing search index trigger...');
  const testItem = {
    title: 'Test Trigger Item',
    description: 'Testing automatic search index updates',
    category: 'test',
    price: 100.00,
    size: 'M',
    condition: 'new',
    location: 'Test Location'
  };

  // Insert test item
  const { data: insertedItem, error: insertError } = await supabase
    .from('items')
    .insert([testItem])
    .select()
    .single();

  if (insertError) {
    console.error('❌ Failed to insert test item:', insertError.message);
    hasErrors = true;
  } else {
    // Check if item was indexed
    const { data: indexedItem, error: indexError } = await supabase
      .from('search_index')
      .select('*')
      .eq('item_id', insertedItem.id)
      .single();

    if (indexError) {
      console.error('❌ Trigger test failed:', indexError.message);
      hasErrors = true;
    } else {
      console.log('✅ Trigger successfully created search index entry');
    }

    // Clean up test item
    await supabase
      .from('items')
      .delete()
      .eq('id', insertedItem.id);
  }

  // Final status
  if (hasErrors) {
    console.log('\n❌ Tests completed with errors. Please fix the issues above.');
  } else {
    console.log('\n✅ All tests passed successfully!');
  }
}

testSearchSetup().catch(error => {
  console.error('Unexpected error during testing:', error);
  process.exit(1);
});
