'use client'

import React, { useState } from 'react';
import { Camera, Upload, Phone, Globe, Calendar, Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../context/AuthContext';

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const userType = user?.userType || 'buyer';
  
  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto relative">
                <button className="absolute bottom-0 right-0 p-2 bg-gray-900 rounded-full text-white hover:bg-gray-800">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h1 className="text-xl font-semibold">Complete your profile</h1>
            <p className="text-gray-600 mt-1">Help others get to know you better</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1.5">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1.5">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-3 py-2 pl-10 border rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1.5">Location</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-3 py-2 pl-10 border rounded-lg"
                  placeholder="Enter your city"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      );
    }

    if (step === 2 && userType === 'seller') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Verify your identity</h1>
            <p className="text-gray-600 mt-1">Help us maintain a secure marketplace</p>
          </div>

          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              To protect our community, we require sellers to verify their identity before listing.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <label htmlFor="governmentId" className="block text-sm font-medium mb-1.5">Government ID</label>
              <button className="w-full p-4 border-2 border-dashed rounded-lg hover:border-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload a photo of your ID</span>
                </div>
              </button>
            </div>

            <div>
              <label htmlFor="venueContract" className="block text-sm font-medium mb-1.5">Venue Contract</label>
              <button className="w-full p-4 border-2 border-dashed rounded-lg hover:border-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload your venue contract</span>
                </div>
              </button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600">
                Your information is encrypted and securely stored. We'll review your documents within 24 hours.
              </div>
            </div>
          </div>

          <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800">
            Submit for verification
          </button>
        </div>
      );
    }

    if (step === 2 && userType === 'buyer') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Set your preferences</h1>
            <p className="text-gray-600 mt-1">Help us find your perfect wedding date</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="preferredStartDate" className="block text-sm font-medium mb-1.5">Preferred Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="preferredStartDate"
                    name="preferredStartDate"
                    className="w-full px-3 py-2 pl-10 border rounded-lg"
                    placeholder="Start date"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="preferredEndDate"
                    name="preferredEndDate"
                    className="w-full px-3 py-2 pl-10 border rounded-lg"
                    placeholder="End date"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium mb-1.5">Guest Count</label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter guest count"
              />
            </div>
          </div>

          <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800">
            Save Preferences
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      {renderStep()}
    </div>
  );
}

