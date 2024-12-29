'use client'

import React, { useState } from 'react';
import { Trash2, Minus, Plus, ChevronRight, Lock, Truck, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import RecentOrders from './RecentOrders';

const MarketplaceCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vintage Wedding Dress",
      price: 899,
      originalPrice: 2200,
      size: "6",
      color: "Ivory",
      quantity: 1,
      image: "/placeholder.svg?height=200&width=200&text=Wedding-Dress",
      seller: "Emma's Boutique",
      shipping: 25,
      condition: "Like New"
    },
    {
      id: 2,
      name: "Crystal Table Centerpieces (Set of 10)",
      price: 299,
      originalPrice: 450,
      quantity: 2,
      image: "/placeholder.svg?height=200&width=200&text=Centerpieces",
      seller: "Wedding Decor Co",
      shipping: 35,
      condition: "New"
    }
  ]);

  const [shippingOption, setShippingOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const baseShipping = cartItems.reduce((sum, item) => sum + (item.shipping * item.quantity), 0);
    return shippingOption === 'express' ? baseShipping * 1.5 : baseShipping;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const handlePromoCode = () => {
    // Simulated promo code validation
    if (promoCode.toUpperCase() === 'WEDDING10') {
      setPromoError('');
      // Apply discount logic
    } else {
      setPromoError('Invalid promo code');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border p-6">
            <h1 className="text-xl font-semibold mb-6">Shopping Cart ({cartItems.length} items)</h1>

            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          shippingOption={shippingOption}
          setShippingOption={setShippingOption}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          promoError={promoError}
          handlePromoCode={handlePromoCode}
          calculateSubtotal={calculateSubtotal}
          calculateShipping={calculateShipping}
          calculateTotal={calculateTotal}
        />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default MarketplaceCart;

