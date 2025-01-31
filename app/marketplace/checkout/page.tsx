"use client";

import React, { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import OrderSummary from "../../components/marketplace/OrderSummary";
import { Alert, AlertDescription } from "../../components/ui/alert";

interface Discount {
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  code: string;
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shippingOption, setShippingOption] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState<Discount | null>(null);

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const baseShipping = items.reduce((total, item) => total + (item.shipping * item.quantity), 0);
    return shippingOption === "express" ? baseShipping * 1.5 : baseShipping;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const calculateDiscount = () => {
    if (!discount) return 0;
    
    if (discount.type === 'percentage') {
      return (calculateSubtotal() * discount.value) / 100;
    } else if (discount.type === 'fixed') {
      return discount.value;
    } else if (discount.type === 'shipping') {
      return calculateShipping();
    }
    return 0;
  };

  const handlePromoCode = () => {
    // Simple promo code validation
    if (promoCode === 'SAVE10') {
      setDiscount({ type: 'percentage', value: 10, code: 'SAVE10' });
      setPromoError('');
    } else if (promoCode === 'FREESHIP') {
      setDiscount({ type: 'shipping', value: 100, code: 'FREESHIP' });
      setPromoError('');
    } else {
      setDiscount(null);
      setPromoError('Invalid promo code');
    }
  };

  const validateForm = () => {
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      setError("Invalid card number");
      return false;
    }
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setError("Invalid expiry date (MM/YY)");
      return false;
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      setError("Invalid CVV");
      return false;
    }
    if (!formData.zipCode.match(/^\d{5}(-\d{4})?$/)) {
      setError("Invalid ZIP code");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }
    
    setLoading(true);
    try {
      // TODO: Implement actual payment processing here
      const paymentData = {
        ...formData,
        amount: calculateTotal(),
        items,
        shipping: {
          method: shippingOption,
          cost: calculateShipping()
        }
      };
      console.log("Processing payment...", paymentData);
      
      // For now, simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the cart after successful payment
      clearCart();
      
      // Redirect to success page
      window.location.href = "/marketplace/checkout/success";
    } catch (error) {
      console.error("Payment failed:", error);
      setError("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user makes changes
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Your cart is empty. Please add items before proceeding to checkout.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-xl border p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="col-span-2">
              <h2 className="text-lg font-medium mb-4">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="col-span-2">
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="col-span-2">
              <h2 className="text-lg font-medium mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

            {error && (
              <Alert className="bg-red-50 border-red-200 mb-4">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 mt-8 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>

          <OrderSummary
            cartItems={items}
            shippingOption={shippingOption}
            setShippingOption={setShippingOption}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            promoError={promoError}
            calculateSubtotal={calculateSubtotal}
            calculateShipping={calculateShipping}
            calculateTotal={calculateTotal}
            calculateDiscount={calculateDiscount}
            discount={discount}
          />
        </div>
      </div>
    </div>
  );
}
