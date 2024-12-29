import React from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface OrderSummaryProps {
  cartItems: any[];
  shippingOption: string;
  setShippingOption: (option: string) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoError: string;
  handlePromoCode: () => void;
  calculateSubtotal: () => number;
  calculateShipping: () => number;
  calculateTotal: () => number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  shippingOption,
  setShippingOption,
  promoCode,
  setPromoCode,
  promoError,
  handlePromoCode,
  calculateSubtotal,
  calculateShipping,
  calculateTotal
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl border p-6 sticky top-6">
        <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

        {/* Shipping Options */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Shipping</h3>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  id="standardShipping"
                  value="standard"
                  checked={shippingOption === 'standard'}
                  onChange={() => setShippingOption('standard')}
                  className="text-gray-900"
                />
                <div>
                  <p className="font-medium">Standard Shipping</p>
                  <p className="text-sm text-gray-600">5-7 business days</p>
                </div>
              </div>
              <span>${calculateShipping().toFixed(2)}</span>
            </label>

            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  id="expressShipping"
                  value="express"
                  checked={shippingOption === 'express'}
                  onChange={() => setShippingOption('express')}
                  className="text-gray-900"
                />
                <div>
                  <p className="font-medium">Express Shipping</p>
                  <p className="text-sm text-gray-600">2-3 business days</p>
                </div>
              </div>
              <span>${(calculateShipping() * 1.5).toFixed(2)}</span>
            </label>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Promo Code</h3>
          <div className="flex gap-2">
            <input
              type="text"
              id="promoCode"
              name="promoCode"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Enter code"
            />
            <button
              onClick={handlePromoCode}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Apply
            </button>
          </div>
          {promoError && (
            <p className="text-red-600 text-sm mt-1">{promoError}</p>
          )}
        </div>

        {/* Calculations */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span>${calculateShipping().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          Checkout
        </button>

        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            All marketplace purchases are protected by our buyer guarantee.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default OrderSummary;

