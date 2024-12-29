'use client'

import React from 'react';
import { Shield, DollarSign, CalendarCheck, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentOptionsProps {
  askingPrice: number;
  originalPrice: number;
  listingId: string;
  onContactSeller: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ askingPrice, originalPrice, listingId, onContactSeller }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl border p-6 sticky top-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-2xl font-semibold">${askingPrice.toLocaleString()}</p>
            <p className="text-gray-500 line-through">${originalPrice.toLocaleString()}</p>
          </div>
          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
            {Math.round((1 - askingPrice / originalPrice) * 100)}% off
          </span>
        </div>

        <div className="space-y-2 pt-4 border-t">
          {/* Protected Payment Badge */}
          <div className="flex items-center gap-2 text-gray-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Protected payments & transfers</span>
          </div>
          {/* Quick Stats */}
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarCheck className="w-5 h-5" />
            <span className="text-sm">Available immediately</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-5 h-5" />
            <span className="text-sm">Transfer policy verified</span>
          </div>
        </div>

        <button 
          onClick={onContactSeller}
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Contact Seller
        </button>
        
        <button 
          onClick={() => router.push(`/listing/${listingId}/payment-escrow`)}
          className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
        >
          Make an Offer
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;

