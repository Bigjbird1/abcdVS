"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import RecentOrders from "./RecentOrders";
import PromoCode from "./PromoCode";

interface Discount {
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  code: string;
}

const MarketplaceCart = () => {
  const { items: cartItems, updateQuantity, removeItem } = useCart();
  const [shippingOption, setShippingOption] = useState("standard");
  const [discount, setDiscount] = useState<Discount | null>(null);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    const baseShipping = cartItems.reduce(
      (sum, item) => sum + item.shipping * item.quantity,
      0,
    );
    // If shipping discount is applied, return 0
    if (discount?.type === 'shipping') {
      return 0;
    }
    return shippingOption === "express" ? baseShipping * 1.5 : baseShipping;
  };

  const calculateDiscount = () => {
    if (!discount) return 0;
    
    const subtotal = calculateSubtotal();
    
    switch (discount.type) {
      case 'percentage':
        return (subtotal * discount.value) / 100;
      case 'fixed':
        return discount.value;
      case 'shipping':
        return calculateShipping();
      default:
        return 0;
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() - calculateDiscount();
  };

  const handleApplyPromo = (newDiscount: Discount) => {
    setDiscount(newDiscount.value === 0 ? null : newDiscount);
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

            {cartItems.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <PromoCode
                  onApplyPromo={handleApplyPromo}
                  subtotal={calculateSubtotal()}
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          shippingOption={shippingOption}
          setShippingOption={setShippingOption}
          calculateSubtotal={calculateSubtotal}
          calculateShipping={calculateShipping}
          calculateDiscount={calculateDiscount}
          calculateTotal={calculateTotal}
          discount={discount}
        />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default MarketplaceCart;
