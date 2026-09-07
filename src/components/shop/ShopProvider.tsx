"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: string | number;
  type: string;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  badge?: "Best Seller" | "New" | "Most Popular";
}

interface ShopContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ShopContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        quickViewProduct,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
