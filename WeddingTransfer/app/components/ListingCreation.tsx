// app/components/ListingCreation.tsx
'use client'

import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, ArrowRight, AlertCircle } from 'lucide-react';

const ListingCreation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    weddingDate: '',
    venueLocation: '',
    originalPrice: '',
    askingPrice: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    // Here you would typically validate the form before proceeding
    setStep(prevStep => prevStep + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm`}>
              1
            </div>
            <span className={step >= 1 ? 'font-medium' : 'text-gray-400'}>Basic Details</span>
          </div>
          <div className="h-px bg-gray-300 w-12"></div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm`}>
              2
            </div>
            <span className={step >= 2 ? 'font-medium' : 'text-gray-400'}>Package Details</span>
          </div>
          <div className="h-px bg-gray-300 w-12"></div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm`}>
              3
            </div>
            <span className={step >= 3 ? 'font-medium' : 'text-gray-400'}>Photos & Description</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h1 className="text-xl font-semibold mb-6">Tell us about your date</h1>

          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Before listing, please confirm with your venue that your date/package is transferable. 
                Different venues have different policies regarding transfers.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label htmlFor="weddingDate" className="block text-sm font-medium mb-2">Wedding Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  id="weddingDate"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 border rounded-lg pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="venueLocation" className="block text-sm font-medium mb-2">Venue Location</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="venueLocation"
                  name="venueLocation"
                  value={formData.venueLocation}
                  onChange={handleInputChange}
                  placeholder="Enter venue name and city"
                  className="w-full py-2 px-3 border rounded-lg pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium mb-2">Original Price</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full py-2 px-3 border rounded-lg pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label htmlFor="askingPrice" className="block text-sm font-medium mb-2">Asking Price</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="askingPrice"
                    name="askingPrice"
                    value={formData.askingPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full py-2 px-3 border rounded-lg pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">Brief Description</label>
              <textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="What's included in your package? Any special features?"
                rows={4}
                className="w-full py-2 px-3 border rounded-lg resize-none"
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button className="text-gray-500 hover:text-gray-700">
              Save as draft
            </button>
            <button 
              onClick={handleNextStep}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
            >
              Next step
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCreation;

