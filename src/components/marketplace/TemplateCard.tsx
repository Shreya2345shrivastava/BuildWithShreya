"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye, Bookmark } from "lucide-react";
import Image from "next/image";

interface TemplateCardProps {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: string;
  previewColor: string;
}

export function TemplateCard({ name, subtitle, category, price, previewColor }: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group flex flex-col rounded-3xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1"
    >
      {/* Preview Area */}
      <div 
        className="relative w-full aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: previewColor }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-colors duration-300 z-10" />
        
        {/* Mock content for preview */}
        <div className="absolute inset-4 sm:inset-6 bg-white dark:bg-[#0B1110] rounded-xl shadow-lg border border-black/10 dark:border-white/10 overflow-hidden transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
           <div className="w-full h-8 border-b border-black/5 dark:border-white/5 flex items-center px-4 gap-1.5 bg-black/5 dark:bg-white/5">
             <div className="w-2 h-2 rounded-full bg-red-400" />
             <div className="w-2 h-2 rounded-full bg-amber-400" />
             <div className="w-2 h-2 rounded-full bg-green-400" />
           </div>
           <div className="p-4 flex flex-col gap-2">
             <div className="w-1/3 h-4 rounded-md bg-black/10 dark:bg-white/10" />
             <div className="w-full h-24 rounded-lg bg-black/5 dark:bg-white/5 mt-2" />
           </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 z-20 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full shadow-lg hover:scale-105 transition-transform">
            <Eye size={16} /> Preview
          </button>
          <button className="flex items-center justify-center w-9 h-9 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-black transition-colors hover:scale-105">
            <Bookmark size={16} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-peach)]">
            {category}
          </span>
          <span className="text-sm font-semibold text-black dark:text-white tabular-nums">
            {price}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-black dark:text-white mb-1">
          {name}
        </h3>
        
        <p className="text-sm text-black/60 dark:text-white/50 leading-relaxed mb-6 flex-grow">
          {subtitle}
        </p>

        <button className="flex items-center justify-between w-full pt-4 border-t border-black/5 dark:border-white/5 text-sm font-semibold text-black/70 dark:text-white/70 group-hover:text-[var(--color-accent-peach)] transition-colors">
          Use Template
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
