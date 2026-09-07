"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";

interface CartButtonProps {
  isMobile?: boolean;
}

export function CartButton({ isMobile }: CartButtonProps) {
  const { openCart, totalItems, totalPrice } = useCart();

  return (
    <div className={cn("block", isMobile ? "w-full" : "")}>
      <motion.button
        layout
        onClick={openCart}
        className={cn(
          "relative flex items-center justify-center gap-2.5 overflow-hidden",
          "rounded-full border border-black/10 dark:border-white/10",
          "bg-white/80 dark:bg-[#1A201C]/80 backdrop-blur-md",
          "px-4 py-2.5",
          "shadow-sm transition-all duration-300 ease-out",
          "hover:-translate-y-0.5 hover:shadow-md hover:bg-white dark:hover:bg-[#232A26]",
          "active:translate-y-0 active:shadow-sm",
          isMobile ? "w-full py-3.5" : "w-auto"
        )}
      >
        {/* Icon & Badge Container */}
        <div className="relative flex items-center justify-center">
          <ShoppingBag size={18} className="text-black/80 dark:text-white/90" strokeWidth={1.5} />
          
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-accent-peach)] px-1 shadow-sm border border-white dark:border-[#131715]"
            >
              <span className="text-[10px] font-bold text-white dark:text-[#131715] leading-none">
                {totalItems}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text Container */}
        <div className="flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            {totalItems > 0 ? (
              <motion.span
                key="full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-[0.9rem] font-medium text-black dark:text-white/90 whitespace-nowrap"
              >
                {totalItems} {totalItems === 1 ? "Item" : "Items"} <span className="text-black/30 dark:text-white/30 mx-1">•</span> ₹{totalPrice.toLocaleString()}
              </motion.span>
            ) : (
              <motion.span
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-[0.9rem] font-medium text-black dark:text-white/90 whitespace-nowrap"
              >
                Start Shopping
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
