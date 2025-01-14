'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, Check, ArrowRight, Mail, Key, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { Alert, AlertDescription } from './ui/alert';

interface AuthModalProps {
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialMode }) => {
  const [authMode, setAuthMode] = useState(initialMode);
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, setHasCompletedProfileSetup } = useAuth();

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [handleEscapeKey]);

  const handleSignup = useCallback(async () => {
    if (!userType || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await signup(email, password, userType);
      setHasCompletedProfileSetup(false);
      onClose();
    } catch (error: any) {
      setError(error?.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, userType, signup, setHasCompletedProfileSetup, onClose]);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      onClose();
    } catch (error: any) {
      setError(error?.message || 'Failed to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, onClose]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const changeAuthMode = useCallback((mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setEmail('');
    setPassword('');
    setError('');
    setUserType(null);
  }, []);

  // Replace from here
const renderContent = useCallback(() => {
  if (authMode === 'login') {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg pl-10"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg pl-10 pr-10"
                placeholder="Enter your password"
                required
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => changeAuthMode('signup')}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </p>
          <Link href="/password-recovery" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    );
  }

  // Signup mode
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="space-y-4">
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              id="signup-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg pl-10"
              placeholder="Enter your email"
              required
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg pl-10 pr-10"
              placeholder="Create a password"
              required
            />
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="userType" className="block text-sm font-medium mb-1">I am a:</label>
          <input type="hidden" id="userType" name="userType" value={userType || ''} required />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setUserType('buyer')}
              className={`flex-1 py-2 rounded-lg ${userType === 'buyer' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setUserType('seller')}
              className={`flex-1 py-2 rounded-lg ${userType === 'seller' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
            >
              Seller
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
          disabled={isLoading || !userType}
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => changeAuthMode('login')}
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}, [authMode, changeAuthMode, email, handleLogin, handleSignup, isLoading, password, showPassword, togglePasswordVisibility, userType]);
// To here

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          disabled={isLoading}
        >
          <X className="w-6 h-6" />
        </button>
        {error && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthModal;

