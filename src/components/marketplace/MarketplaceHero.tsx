"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui";

const POPULAR_SEARCHES = [
  "Portfolio",
  "Birthday Website",
  "Wedding Page",
  "Author Website",
  "Coach Website",
  "Personal Brand",
];

export function MarketplaceHero() {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto w-full relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-black dark:text-white leading-[1.05] tracking-tight mb-6"
        >
          Website Templates
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Beautiful, ready-to-customize websites for creators, authors, businesses, coaches, celebrations, and personal brands.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl relative mb-6"
        >
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40">
            <Search size={22} strokeWidth={2} />
          </div>
          <Input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-16 pr-6 py-5 text-lg sm:text-xl bg-white dark:bg-[#1A1D1C] border border-black/10 dark:border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] focus:ring-2 focus:ring-[var(--color-accent-peach)]/50 focus:border-[var(--color-accent-peach)] transition-all placeholder:text-black/30 dark:placeholder:text-white/30"
          />
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40 mr-2">
            Popular:
          </span>
          {POPULAR_SEARCHES.map((search) => (
            <button
              key={search}
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              {search}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
