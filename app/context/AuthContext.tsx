'use client'
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbgdbsfwpjeuzvpuzqsh.supabase.co'; // Ensure this is correct
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2Ric2Z3cGpldXp2cHV6cXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDQ5OTAsImV4cCI6MjA1MzMyMDk5MH0.VX5XncLFLLfHU78un_bmU3So9G5peYlKKIvGMaebf_8'; // Ensure this is correct

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UserProfile {
  id: string;
  email: string;
  userType: 'buyer' | 'seller'; // Ensure this matches your Supabase table's column name
  has_completed_setup: boolean;
}

type AuthContextType = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedProfileSetup: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userType: 'buyer' | 'seller') => Promise<void>; // Ensure this is defined
  signIn: (email: string, password: string) => Promise<void>; // Ensure this is defined
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setHasCompletedProfileSetup: (value: boolean) => void; // Ensure this is present
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedProfileSetup, setHasCompletedProfileSetup] = useState(false);

  const fetchProfile = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
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
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAuthStateChange = useCallback(async (session: any) => {
    if (session?.user) {
      await fetchProfile(session.user.id);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setHasCompletedProfileSetup(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    const initialize = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    };

    initialize();
    return () => subscription.unsubscribe();
  }, [fetchProfile, handleAuthStateChange]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userType: 'buyer' | 'seller') => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { userType }
        }
      });
      if (error) throw error;
      return;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
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
      console.error('Logout error:', error);
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
        login,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
