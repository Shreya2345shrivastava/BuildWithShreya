"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui";

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[110] h-[100dvh] w-full sm:w-[450px] bg-[var(--color-bg-ivory)] dark:bg-[#131715] shadow-2xl border-l border-black/5 dark:border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5">
              <h2 className="text-xl font-serif text-black dark:text-white flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                  <ShoppingBag size={48} className="mb-4 text-[var(--color-accent-peach)]" strokeWidth={1} />
                  <p className="text-lg font-medium text-black dark:text-white">Your cart is empty.</p>
                  <p className="text-sm mt-2">Looks like you haven't added any products yet.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-[#1A1C1C] rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 rounded-lg bg-[#F5F1EC] dark:bg-[#121515] overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-grow">
                      <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/40 mb-1 tracking-wider">{item.category}</span>
                      <h3 className="text-sm font-semibold text-black dark:text-white mb-1 leading-tight line-clamp-2">{item.name}</h3>
                      <span className="text-sm font-bold text-[var(--color-accent-peach)] mb-auto">₹{item.price}</span>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white">
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button onClick={() => removeItem(item.id)} className="text-black/40 dark:text-white/40 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white dark:bg-[#161818] border-t border-black/5 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-black/60 dark:text-white/60">Subtotal</span>
                  <span className="text-xl font-bold text-black dark:text-white">₹{totalPrice.toLocaleString()}</span>
                </div>
                
                <Button 
                  href="/checkout"
                  size="lg"
                  rounded={false}
                  className="w-full justify-center py-4 text-[0.95rem] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-center text-[10px] text-black/40 dark:text-white/40 mt-4 uppercase tracking-wider flex items-center justify-center gap-1">
                  Secure checkout via Stripe 
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
