'use client'
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ContactSellerProps {
  onClose: () => void;
}

const ContactSeller: React.FC<ContactSellerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Contact Seller</h3>
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="seller-message" 
              className="block text-sm font-medium mb-1"
            >
              Message
            </label>
            <textarea 
              id="seller-message"
              rows={4}
              className="w-full border rounded-lg p-2"
              placeholder="Tell the seller what you'd like to know..."
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 border py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSeller;

export default ContactSeller

