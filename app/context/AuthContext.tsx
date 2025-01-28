"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { createClient, Session, AuthChangeEvent } from "@supabase/supabase-js";

const supabaseUrl = "https://sbgdbsfwpjeuzvpuzqsh.supabase.co"; // Ensure this is correct
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2Ric2Z3cGpldXp2cHV6cXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDQ5OTAsImV4cCI6MjA1MzMyMDk5MH0.VX5XncLFLLfHU78un_bmU3So9G5peYlKKIvGMaebf_8"; // Ensure this is correct

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UserProfile {
  id: string;
  email: string;
  userType: "buyer" | "seller"; // Ensure this matches your Supabase table's column name
  has_completed_setup: boolean;
}

type AuthContextType = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedProfileSetup: boolean;
  signUp: (
    email: string,
    password: string,
    userType: "buyer" | "seller",
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setHasCompletedProfileSetup: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedProfileSetup, setHasCompletedProfileSetup] =
    useState(false);

  const fetchProfile = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile && !error) {
        setUser(profile);
        setIsAuthenticated(true);
        setHasCompletedProfileSetup(profile.has_completed_setup);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setHasCompletedProfileSetup(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAuthStateChange = useCallback(
    async (event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setHasCompletedProfileSetup(false);
      }
    },
    [fetchProfile],
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    };

    initialize();
    return () => subscription.unsubscribe();
  }, [fetchProfile, handleAuthStateChange]);

  const signUp = async (
    email: string,
    password: string,
    userType: "buyer" | "seller",
  ) => {
    setIsLoading(true);
    try {
      // Get client info
      const userAgent = window.navigator.userAgent;
      
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: { userType },
          },
        },
      );
      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Create the user profile
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          email: email,
          userType: userType,
          has_completed_setup: false,
        },
      ]);

      if (profileError) {
        // If profile creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        throw new Error("Failed to create user profile");
      }

      // Log the signup event
      const { error: logError } = await supabase.rpc('fn_log_auth_event', {
        p_user_id: authData.user.id,
        p_event_type: 'signup',
        p_ip_address: '', // IP is captured server-side
        p_user_agent: userAgent,
        p_metadata: {
          userType: userType,
          email: email
        }
      });

      if (logError) {
        console.error('Error logging auth event:', logError);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userAgent = window.navigator.userAgent;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // Log failed login attempt
        await supabase.rpc('fn_log_auth_event', {
          p_user_id: null,
          p_event_type: 'login',
          p_ip_address: '',
          p_user_agent: userAgent,
          p_metadata: {
            email: email,
            success: false,
            failure_reason: error.message
          }
        });
        
        if (error.message.includes("Invalid login")) {
          throw new Error("Invalid email or password");
        }
        throw error;
      }

      // Log successful login
      if (data.user) {
        const { error: logError } = await supabase.rpc('fn_log_auth_event', {
          p_user_id: data.user.id,
          p_event_type: 'login',
          p_ip_address: '',
          p_user_agent: userAgent,
          p_metadata: {
            email: email,
            success: true
          }
        });

        if (logError) {
          console.error('Error logging auth event:', logError);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        hasCompletedProfileSetup,
        signUp,
        signIn,
        logout,
        refreshProfile,
        setHasCompletedProfileSetup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
