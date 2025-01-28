// test-supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sbgdbsfwpjeuzvpuzqsh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2Ric2Z3cGpldXp2cHV6cXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDQ5OTAsImV4cCI6MjA1MzMyMDk5MH0.VX5XncLFLLfHU78un_bmU3So9G5peYlKKIvGMaebf_8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sleep function for rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a unique test email
const timestamp = Math.floor(Math.random() * 1000000); // Simple numeric ID
const testEmail = `testuser${timestamp}@example.com`; // Using example.com domain
const testPassword = "TestPassword123!";
const testUserType = "buyer";

async function signInExistingUser() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    return null;
  }
}

async function testSignupFlow() {
  console.log("Starting signup flow test...");
  console.log(`Using test email: ${testEmail}`);

  try {
    // Try to sign in first
    console.log("\nAttempting to use existing test user...");
    const existingUser = await signInExistingUser();
    
    let authData;
    if (existingUser) {
      console.log("✓ Using existing test user");
      authData = existingUser;
    } else {
      // Step 1: Sign up the user
      console.log("\n1. Testing user signup...");
      
      // Add retry logic with exponential backoff
      let retries = 3;
      let signUpError;
      
      while (retries > 0) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
            options: {
              data: { userType: testUserType }
            }
          });
          
          if (error) {
            if (error.status === 429) {
              console.log(`Rate limited. Waiting before retry... (${retries} retries left)`);
              await sleep(2000 * (4 - retries)); // Exponential backoff
              retries--;
              continue;
            }
            throw error;
          }
          
          authData = data;
          break;
        } catch (error) {
          signUpError = error;
          if (error.status !== 429) break;
          retries--;
          if (retries === 0) throw error;
        }
      }

      if (signUpError) {
        throw signUpError;
      }
      console.log("✓ Auth user created successfully");
    }
    
    console.log("User ID:", authData.user.id);

    // Step 2: Create the profile (if it doesn't exist)
    console.log("\n2. Creating user profile...");
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (!existingProfile) {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([
          { 
            id: authData.user.id,
            user_type: testUserType,
            email: testEmail,
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) {
        throw insertError;
      }
      console.log("✓ Profile created successfully");
    } else {
      console.log("✓ Using existing profile");
    }

    // Step 3: Verify profile
    console.log("\n3. Checking profile...");
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      throw profileError;
    }
    console.log("✓ Profile verified successfully");
    console.log("Profile data:", profile);

    // Step 4: Check auth events log
    console.log("\n4. Checking auth events log...");
    const { data: authEvents, error: eventsError } = await supabase
      .from("auth_events")
      .select("*")
      .eq("user_id", authData.user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (eventsError) {
      throw eventsError;
    }
    console.log("✓ Auth event logged successfully");
    console.log("Auth event:", authEvents[0]);

    console.log("\n✓ All tests completed successfully!");

  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    console.error("Error details:", error);
  }
}

// Run the tests
testSignupFlow();
