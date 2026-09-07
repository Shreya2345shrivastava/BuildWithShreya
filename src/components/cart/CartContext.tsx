"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Mock data for initial presentation
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "first-build",
      name: "First Build It, Then Make It Beautiful",
      price: 499,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1616628188550-808682f392a4?q=80&w=800&auto=format&fit=crop",
      category: "Books",
    },
    {
      id: "creator-kit",
      name: "Ultimate Creator Kit",
      price: 899,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=800&auto=format&fit=crop",
      category: "Resources",
    }
  ]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
    openCart(); // Auto open cart when adding
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  return (
    <CartContext.Provider value={{
      isCartOpen,
      openCart,
      closeCart,
      items,
      addItem,
      removeItem,
      updateQuantity,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
