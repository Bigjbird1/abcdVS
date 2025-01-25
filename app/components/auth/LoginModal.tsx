'use client';
import { useState } from 'react';
import { Mail, Eye, EyeOff, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps {
  onClose: () => void;
}

  const LoginModal = ({ onClose }: LoginModalProps) => {
  const { signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await signUp(email, password, userType);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            {isSignUp ? 'Create account' : 'Log in to your account'}
          </h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <Shield className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-1.5">I want to:</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType('buyer')}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                      userType === 'buyer' 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Find a date
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('seller')}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                      userType === 'seller' 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Sell my date
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 bg-gray-900 text-white rounded-lg transition-opacity ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              {isLoading ? 'Loading...' : isSignUp ? 'Sign up' : 'Log in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-900 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-gray-900 rounded"
              >
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
