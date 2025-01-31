"use client";

import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { SavedItemsProvider } from "./context/SavedItemsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SavedItemsProvider>
        <CartProvider>{children}</CartProvider>
      </SavedItemsProvider>
    </AuthProvider>
  );
}
