'use client'

import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Eye, EyeOff, KeyRound } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useRouter } from 'next/navigation';

const PasswordRecovery = () => {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to initiate the password reset process
    // For now, we'll just move to the next step
    setStep('verify');
  };

  const handleSubmitReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to reset the password
    // For now, we'll just log it and redirect to login
    console.log('Password reset');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {step === 'request' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-6 h-6 text-gray-600" />
                </div>
                <h1 className="text-xl font-semibold">Reset your password</h1>
                <p className="text-gray-600 mt-1">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 pl-10 border rounded-lg"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Back to login
                </button>
              </div>
            </div>
          )}

          {step === 'verify' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-gray-600" />
                </div>
                <h1 className="text-xl font-semibold">Check your email</h1>
                <p className="text-gray-600 mt-1">
                  We've sent a password reset link to<br />
                  <span className="font-medium">{email}</span>
                </p>
              </div>

              <Alert>
                <Mail className="w-4 h-4" />
                <AlertDescription>
                  The link will expire in 1 hour. If you don't see the email, check your spam folder.
                </AlertDescription>
              </Alert>

              <button 
                onClick={() => setStep('reset')}
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                Open Email App
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button 
                  onClick={() => setStep('request')}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            </div>
          )}

          {step === 'reset' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-6 h-6 text-green-600" />
                </div>
                <h1 className="text-xl font-semibold">Set new password</h1>
                <p className="text-gray-600 mt-1">
                  Your password must be at least 8 characters
                </p>
              </div>

              <form onSubmit={handleSubmitReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg pr-10"
                      placeholder="Enter new password"
                      required
                      minLength={8}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg pr-10"
                      placeholder="Confirm new password"
                      required
                      minLength={8}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800"
                >
                  Reset Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;

