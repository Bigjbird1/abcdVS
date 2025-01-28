// app/components/ListingCreation.tsx
"use client";

import React, { useState, useCallback } from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  ArrowRight,
  AlertCircle,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { uploadMultipleImages, deleteImage } from "../lib/supabase-utils";

const ListingCreation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    weddingDate: "",
    venueLocation: "",
    originalPrice: "",
    askingPrice: "",
    description: "",
    images: [] as string[],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedUrls = await uploadMultipleImages(Array.from(files));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      setUploadError('Failed to upload images. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      await deleteImage(imageUrl);
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handleNextStep = () => {
    // Validate current step before proceeding
    if (step === 3 && formData.images.length === 0) {
      setUploadError('Please upload at least one image');
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full ${step >= 1 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"} flex items-center justify-center text-sm`}
            >
              1
            </div>
            <span className={step >= 1 ? "font-medium" : "text-gray-400"}>
              Basic Details
            </span>
          </div>
          <div className="h-px bg-gray-300 w-12"></div>
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full ${step >= 2 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"} flex items-center justify-center text-sm`}
            >
              2
            </div>
            <span className={step >= 2 ? "font-medium" : "text-gray-400"}>
              Package Details
            </span>
          </div>
          <div className="h-px bg-gray-300 w-12"></div>
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full ${step >= 3 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"} flex items-center justify-center text-sm`}
            >
              3
            </div>
            <span className={step >= 3 ? "font-medium" : "text-gray-400"}>
              Photos & Description
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h1 className="text-xl font-semibold mb-6">
            Tell us about your date
          </h1>

          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Before listing, please confirm with your venue that your
                date/package is transferable. Different venues have different
                policies regarding transfers.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {step === 3 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Photos
                </label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="images"
                      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
                        ${isUploading ? 'bg-gray-50' : 'hover:bg-gray-50'} 
                        ${uploadError ? 'border-red-300' : 'border-gray-300'}`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB each</p>
                        {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
                        {uploadError && <p className="text-sm text-red-500 mt-2">{uploadError}</p>}
                      </div>
                      <input
                        id="images"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>

                  {/* Image Preview Grid */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {formData.images.map((url, index) => (
                        <div key={url} className="relative group">
                          <img
                            src={url}
                            alt={`Upload ${index + 1}`}
                            className="h-40 w-full object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleRemoveImage(url, index)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="weddingDate"
                className="block text-sm font-medium mb-2"
              >
                Wedding Date
              </label>
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
              <label
                htmlFor="venueLocation"
                className="block text-sm font-medium mb-2"
              >
                Venue Location
              </label>
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
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium mb-2"
                >
                  Original Price
                </label>
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
                <label
                  htmlFor="askingPrice"
                  className="block text-sm font-medium mb-2"
                >
                  Asking Price
                </label>
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
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Brief Description
              </label>
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
