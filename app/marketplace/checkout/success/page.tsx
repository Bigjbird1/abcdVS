"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="bg-white rounded-xl border p-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-4">Thank You for Your Purchase!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed. You will receive a confirmation
            email shortly with your order details.
          </p>
          <div className="space-y-4">
            <Link 
              href="/marketplace"
              className="block w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
            <Link
              href="/dashboard"
              className="block w-full bg-white text-gray-900 py-3 rounded-lg border hover:bg-gray-50"
            >
              View Order Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
