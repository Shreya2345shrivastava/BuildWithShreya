"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Star, Sparkles } from "lucide-react";
import { useShop, Product } from "./ShopProvider";

export function UniversalProductCard({ product }: { product: Product }) {
  const { openQuickView } = useShop();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col h-full rounded-[1.5rem] bg-white dark:bg-[#1C201E] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/10 dark:hover:border-white/10 cursor-pointer"
      onClick={() => openQuickView(product)}
    >
      <div className="block relative w-full aspect-[4/3] overflow-hidden bg-[#F6F2EE] dark:bg-black/50">
        <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {/* Top Left: Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-black dark:text-white border border-black/5 dark:border-white/10 shadow-sm z-10">
          {product.type}
        </div>
        
        {/* Top Right: Trust Badge (Phase 8) */}
        {product.badge && (
          <div className="absolute top-4 right-4 bg-[var(--color-accent-peach)] text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm flex items-center gap-1 z-10">
            {product.badge === "Best Seller" && <Star size={10} className="fill-current" />}
            {product.badge === "New" && <Sparkles size={10} />}
            {product.badge}
          </div>
        )}

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            <Eye size={16} />
            Quick View
          </div>
        </div>
      </div>
      
      {/* Content: title + description */}
      <div className="flex flex-col flex-grow px-5 pt-4 pb-0 relative bg-white dark:bg-[#1C201E] z-10">
        <h3 className="font-serif text-[1.15rem] leading-tight text-[#0B1110] dark:text-[#F6F2EE] group-hover:text-[var(--color-accent-peach)] transition-colors line-clamp-1 mb-1">
          {product.title}
        </h3>
        <p className="text-[0.8rem] text-black/50 dark:text-white/50 line-clamp-2 mb-4 flex-grow">{product.description}</p>
      </div>

      {/* Footer: price + hover arrow — sits flush at card bottom */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#1C201E]">
        <span className="font-semibold text-[0.95rem] text-[#0B1110] dark:text-[#F6F2EE]">{product.price}</span>
        {/* Circular arrow — slides in on hover */}
        <button
          className="-translate-x-1 group-hover:translate-x-0 transition-all duration-300 flex items-center justify-center w-8 h-8 rounded-full border border-black/15 dark:border-white/15 text-black/40 dark:text-white/40 group-hover:bg-[#0B1110] group-hover:text-white dark:group-hover:bg-[#F6F2EE] dark:group-hover:text-black group-hover:border-transparent focus:outline-none"
          aria-label="Quick view"
        >
          <ArrowRight size={14} className="stroke-2" />
        </button>
      </div>
    </motion.div>
  );
}
