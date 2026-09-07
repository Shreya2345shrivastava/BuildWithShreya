"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Mock cart data
  const cartItems = [
    { id: 1, title: "SaaS Starter Kit", price: "$49", type: "Template", image: "/images/previews/all/mini-website.jpg" },
    { id: 2, title: "Build It Beautiful", price: "$19", type: "Book", image: "/images/books/book-cover.jpeg" },
  ];

  const subtotal = 68;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-bg-ivory)] dark:bg-[#131715] shadow-2xl z-50 flex flex-col border-l border-black/5 dark:border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5">
              <h2 className="font-serif text-2xl text-black dark:text-white">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X size={20} className="text-black dark:text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col flex-1 justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50">{item.type}</span>
                        <h3 className="text-base font-semibold text-black dark:text-white leading-tight mt-1">{item.title}</h3>
                      </div>
                      <span className="font-semibold text-black dark:text-white">{item.price}</span>
                    </div>
                    <div className="mt-3">
                      <button className="text-xs text-red-500/70 hover:text-red-500 flex items-center gap-1 transition-colors">
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Checkout */}
            <div className="p-6 bg-white dark:bg-[#1C201E] border-t border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-black/60 dark:text-white/60">Subtotal</span>
                <span className="text-xl font-serif font-semibold text-black dark:text-white">${subtotal}</span>
              </div>
              <Button className="w-full justify-center py-4 text-base shadow-lg shadow-[var(--color-accent-peach)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Proceed to Checkout
              </Button>
              <div className="mt-4 flex flex-col items-center gap-2">
                <p className="text-xs text-black/40 dark:text-white/40 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout powered by Stripe
                </p>
                <p className="text-[10px] text-black/40 dark:text-white/40">Instant access sent to your email.</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
