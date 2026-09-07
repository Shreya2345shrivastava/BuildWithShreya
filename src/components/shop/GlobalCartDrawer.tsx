"use client";

import { useShop } from "./ShopProvider";
import { CartDrawer } from "./CartDrawer";

export function GlobalCartDrawer() {
  const { isCartOpen, closeCart } = useShop();

  return <CartDrawer isOpen={isCartOpen} onClose={closeCart} />;
}
