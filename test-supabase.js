// test-supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbgdbsfwpjeuzvpuzqsh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2Ric2Z3cGpldXp2cHV6cXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDQ5OTAsImV4cCI6MjA1MzMyMDk5MH0.VX5XncLFLLfHU78un_bmU3So9G5peYlKKIvGMaebf_8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) throw error;
    console.log('Test query result:', data);
  } catch (error) {
    console.error('Test query error:', error);
  }
}

testSupabase();