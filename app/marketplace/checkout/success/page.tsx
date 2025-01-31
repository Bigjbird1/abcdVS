'use client';

import React from 'react';
import OrderTrackingSystem from '../../../components/marketplace/OrderTrackingSystem';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="mb-8">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800">
              Thank you for your purchase! Your order has been successfully placed.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <h2 className="text-lg font-semibold mb-2">What's Next?</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• You will receive an order confirmation email shortly</li>
              <li>• Track your order status and shipping updates below</li>
              <li>• For any questions, contact our support team</li>
            </ul>
            <div className="mt-4 flex gap-4">
              <Link 
                href="/marketplace" 
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Continue Shopping
              </Link>
              <Link 
                href="/support" 
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Order Tracking System */}
        <OrderTrackingSystem />
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
