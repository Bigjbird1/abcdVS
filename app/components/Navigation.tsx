// components/Navigation.tsx
'use client'
import * as React from 'react';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './auth/LoginModal';
import ProfileSetup from './ProfileSetup';
import { ArrowLeftRight } from 'lucide-react';

const Navigation = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, logout, user, hasCompletedProfileSetup } = useAuth();

  const handleCloseAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  return (
    <>
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              VowSwap
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/list-date">List your date</Link>
              <Link href="/sell-items">Sell items</Link>
              <Link href="/marketplace" className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100">
                Shop
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Log in / Sign up
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {showAuthModal && <LoginModal onClose={handleCloseAuthModal} />}
      {isAuthenticated && !hasCompletedProfileSetup && <ProfileSetup />}
    </>
  );
}

export default Navigation;
