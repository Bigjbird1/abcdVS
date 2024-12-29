'use client'
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import ProfileSetup from './ProfileSetup';
import { ArrowLeftRight } from 'lucide-react';

const Navigation: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { 
    isAuthenticated, 
    logout, 
    hasCompletedProfileSetup 
  } = useAuth();

  const handleAuthClick = useCallback((mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  }, []);

  const handleCloseAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const authButtons = useMemo(() => (
    <>
      <button 
        onClick={() => handleAuthClick('login')}
        className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        Log in
      </button>
      <button 
        onClick={() => handleAuthClick('signup')}
        className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
      >
        Sign up
      </button>
    </>
  ), [handleAuthClick]);

  const authenticatedButtons = useMemo(() => (
    <>
      <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100">Dashboard</Link>
      <button onClick={handleLogout} className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Log out</button>
    </>
  ), [handleLogout]);

  return (
    <>
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              WeddingTransfer
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/list-date" className="text-gray-600 hover:text-gray-900">List your date</Link>
              <Link href="/sell-items" className="text-gray-600 hover:text-gray-900">Sell items</Link>
              <Link href="/date-trading" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <ArrowLeftRight className="w-4 h-4" />
                Date Trading
              </Link>
              {isAuthenticated ? authenticatedButtons : authButtons}
            </div>
          </div>
        </div>
      </nav>
      
      {showAuthModal && (
        <AuthModal 
          onClose={handleCloseAuthModal} 
          initialMode={authMode}
        />
      )}
      
      {isAuthenticated && !hasCompletedProfileSetup && <ProfileSetup />}
    </>
  );
}

export default Navigation;

