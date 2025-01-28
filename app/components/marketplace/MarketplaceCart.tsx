"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Trash2,
  Minus,
  Plus,
  ChevronRight,
  Lock,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import RecentOrders from "./RecentOrders";

const MarketplaceCart = () => {
  const { items: cartItems, updateQuantity, removeItem } = useCart();

  const [shippingOption, setShippingOption] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    const baseShipping = cartItems.reduce(
      (sum, item) => sum + item.shipping * item.quantity,
      0,
    );
    return shippingOption === "express" ? baseShipping * 1.5 : baseShipping;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };


  const handlePromoCode = () => {
    // Simulated promo code validation
    if (promoCode.toUpperCase() === "WEDDING10") {
      setPromoError("");
      // Apply discount logic
    } else {
      setPromoError("Invalid promo code");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border p-6">
            <h1 className="text-xl font-semibold mb-6">
              Shopping Cart ({cartItems.length} items)
            </h1>

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
