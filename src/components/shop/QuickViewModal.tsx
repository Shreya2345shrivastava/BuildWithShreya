"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ExternalLink, ShieldCheck, Zap, Repeat } from "lucide-react";
import { Button } from "@/components/ui";
import { useShop } from "./ShopProvider";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useShop();

  // Handle ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeQuickView]);

  // Lock body scroll when open
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full sm:h-auto sm:max-h-[90vh] max-w-5xl bg-white dark:bg-[#131715] sm:rounded-[2rem] shadow-2xl overflow-hidden border border-black/5 dark:border-white/5 flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Left Image Section (Gallery) */}
            <div className="w-full md:w-1/2 h-72 md:h-full bg-[#F6F2EE] dark:bg-[#1C201E] overflow-y-auto hide-scrollbar flex flex-col gap-1 p-1">
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden">
                <Image src={quickViewProduct.image} alt={quickViewProduct.title} fill className="object-cover" />
              </div>
              {/* Mocking additional gallery images for the 80% product page feel */}
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden">
                <Image src={quickViewProduct.image} alt={`${quickViewProduct.title} detail 2`} fill className="object-cover opacity-80" />
              </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto hide-scrollbar bg-white dark:bg-[#131715]">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[var(--color-accent-peach)] mb-3">
                {quickViewProduct.category}
              </span>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#0B1110] dark:text-[#F6F2EE] leading-tight mb-4">
                {quickViewProduct.title}
              </h2>
              
              <div className="text-2xl font-semibold text-[#0B1110] dark:text-[#F6F2EE] mb-8">
                {quickViewProduct.price}
              </div>

              <p className="text-black/70 dark:text-white/70 leading-relaxed mb-10 text-lg">
                {quickViewProduct.description} This product is meticulously designed for high conversion, beautiful typography, and seamless user experience. Perfect for creators who want to stop tweaking and start launching.
              </p>

              {/* What's Included */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-5">What's Included</h3>
                <ul className="space-y-4">
                  {["Fully responsive on all devices", "SEO optimized structure", "Step-by-step setup guide"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-black/80 dark:text-white/80">
                      <div className="mt-0.5 p-1 rounded-full bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)]">
                        <CheckCircle2 size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions & Trust Layer */}
              <div className="mt-auto space-y-4">
                {/* Live Preview Button (Phase 4) - Only inside modal for Templates */}
                {quickViewProduct.category === "Templates" && (
                  <Button 
                    href="#" 
                    target="_blank"
                    variant="secondary" 
                    className="w-full justify-center py-4 bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)] border-transparent hover:bg-[var(--color-accent-peach)]/20"
                  >
                    View Live Preview
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                )}

                <Button className="w-full justify-center py-4 text-base shadow-lg shadow-[var(--color-accent-peach)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Buy Now
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full justify-center py-4 bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10"
                >
                  Add to Cart
                </Button>

                {/* Trust Layer (Phase 12) */}
                <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-3 text-xs text-black/60 dark:text-white/60">
                    <Zap size={14} className="text-yellow-500" />
                    <span>Instant Access & Download</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-black/60 dark:text-white/60">
                    <Repeat size={14} className="text-blue-500" />
                    <span>Lifetime Updates Included</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-black/60 dark:text-white/60">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>Secure Checkout via Stripe</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
