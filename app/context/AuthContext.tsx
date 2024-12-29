'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  userType: 'buyer' | 'seller';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedProfileSetup: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userType: 'buyer' | 'seller') => Promise<void>;
  logout: () => void;
  setHasCompletedProfileSetup: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedProfileSetup, setHasCompletedProfileSetup] = useState(false);

  useEffect(() => {
    // Check for existing session only on client-side
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        const storedProfileSetup = localStorage.getItem('hasCompletedProfileSetup');
        
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            setHasCompletedProfileSetup(storedProfileSetup === 'true');
          } catch (error) {
            console.error('Error parsing stored user', error);
          }
        }
        
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await delay(1000);
      
      // In v0, just create a mock user
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        userType: 'buyer' as const // userType is hardcoded for now, should be dynamic later
      };

      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(mockUser));
        const hasSetupProfile = localStorage.getItem('hasCompletedProfileSetup');
        
        setUser(mockUser);
        setIsAuthenticated(true);
        setHasCompletedProfileSetup(hasSetupProfile === 'true');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, userType: 'buyer' | 'seller') => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await delay(1000);
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        userType
      };

      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('hasCompletedProfileSetup', 'false');
        
        setUser(newUser);
        setIsAuthenticated(true);
        setHasCompletedProfileSetup(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('hasCompletedProfileSetup');
    }
    setUser(null);
    setIsAuthenticated(false);
    setHasCompletedProfileSetup(false);
  };

  const handleSetProfileSetup = (value: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasCompletedProfileSetup', value.toString());
    }
    setHasCompletedProfileSetup(value);
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated,
        isLoading,
        hasCompletedProfileSetup,
        login,
        signup,
        logout,
        setHasCompletedProfileSetup: handleSetProfileSetup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

