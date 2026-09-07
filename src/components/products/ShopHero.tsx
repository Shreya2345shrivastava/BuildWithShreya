"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui";
import { ArrowRight, BookOpen, Sparkles, LayoutTemplate, Layers } from "lucide-react";
import { SearchOverlay } from "../shop/SearchOverlay";

const floatingCards = [
  {
    icon: BookOpen,
    label: "Books",
    title: "First Build It",
    price: "₹499",
    badge: "Bestseller",
    color: "from-[#d9a48f]/20 to-[#c8aa6d]/10",
    borderColor: "border-[#d9a48f]/30",
    rotate: "-rotate-3",
    top: "top-8",
    left: "left-0",
    delay: 0.3,
  },
  {
    icon: Sparkles,
    label: "LifeOS",
    title: "LifeOS Master",
    price: "₹1,499",
    badge: "Popular",
    color: "from-[#a8b69d]/20 to-[#a8b69d]/5",
    borderColor: "border-[#a8b69d]/30",
    rotate: "rotate-2",
    top: "top-40",
    left: "left-28",
    delay: 0.45,
  },
  {
    icon: LayoutTemplate,
    label: "Templates",
    title: "Minimal Portfolio",
    price: "₹2,499",
    badge: "New",
    color: "from-[#c8aa6d]/20 to-[#c8aa6d]/5",
    borderColor: "border-[#c8aa6d]/30",
    rotate: "rotate-1",
    top: "top-4",
    left: "left-56",
    delay: 0.55,
  },
  {
    icon: Layers,
    label: "Resources",
    title: "Creator Kit",
    price: "₹899",
    badge: "Limited",
    color: "from-[#d9a48f]/15 to-transparent",
    borderColor: "border-[#d9a48f]/20",
    rotate: "-rotate-1",
    top: "top-56",
    left: "left-4",
    delay: 0.65,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function ShopHero() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section className="relative flex items-center w-full min-h-[92vh] overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-28 pb-16 px-6">

      {/* Background Grain + Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/5 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[var(--color-accent-sage)]/10 dark:bg-[var(--color-accent-sage)]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/10 px-3 py-1.5 rounded-full border border-[var(--color-accent-peach)]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-peach)] animate-pulse" />
              BuildWithShreya Ecosystem
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-[clamp(3.2rem,7vw,5.5rem)] text-black dark:text-white leading-[1.03] tracking-tight mb-7"
          >
            Tools for <br />
            <span className="italic text-[var(--color-accent-peach)]">Builders.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-black/55 dark:text-white/55 font-medium leading-relaxed max-w-[520px] mb-10"
          >
            Books, templates, LifeOS, and creator resources. Everything you need to turn your idea into reality.
          </motion.p>

          {/* Search Bar (Phase 2 & 4) */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-[500px] w-full group"
          >
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-black/40 dark:text-white/40 group-focus-within:text-[var(--color-accent-peach)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search for templates, books, resources..."
              className="w-full bg-white dark:bg-[#1C201E] border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-16 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-peach)]/50 focus:border-transparent transition-all shadow-sm group-hover:shadow-md text-base cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <span className="hidden sm:inline-flex items-center justify-center px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-semibold tracking-widest text-black/40 dark:text-white/40">
                ⌘K
              </span>
            </div>
          </motion.div>

          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mt-10 pt-8 border-t border-black/8 dark:border-white/8"
          >
            <div className="flex -space-x-2">
              {["#d9a48f", "#a8b69d", "#c8aa6d", "#b5a5c8"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[var(--color-bg-ivory)] dark:border-[#131715]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-black dark:text-white">1,200+ creators</p>
              <p className="text-xs text-black/50 dark:text-white/40">using these products daily</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Floating Product Cards Collage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:flex items-center justify-center h-[520px]"
        >
          {/* Central glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-[var(--color-accent-peach)]/15 dark:bg-[var(--color-accent-peach)]/8 blur-[80px]" />
          </div>

          {/* Grid of floating cards */}
          <div className="relative w-full h-full">
            {floatingCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute ${card.top} ${card.left} ${card.rotate}`}
                  style={{
                    animation: `float-${i} ${4 + i * 0.7}s ease-in-out infinite alternate`,
                  }}
                >
                  <div className={`relative w-52 bg-gradient-to-br ${card.color} backdrop-blur-sm border ${card.borderColor} rounded-2xl p-4 shadow-xl dark:shadow-black/40`}>
                    {/* Badge */}
                    <span className="absolute -top-2.5 right-3 text-[10px] font-bold uppercase tracking-widest bg-[var(--color-accent-peach)] text-white px-2.5 py-0.5 rounded-full shadow-sm">
                      {card.badge}
                    </span>

                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white/60 dark:bg-white/10 flex items-center justify-center">
                        <Icon size={16} className="text-black/70 dark:text-white/70" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/40">
                        {card.label}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-black dark:text-white leading-tight mb-2">
                      {card.title}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-black dark:text-white">{card.price}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <svg key={s} className="w-2.5 h-2.5 text-[var(--color-accent-peach)] fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Central decorative ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[var(--color-accent-peach)]/20 dark:border-[var(--color-accent-peach)]/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-black/5 dark:border-white/5 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Floating animations via style tag */}
      <style>{`
        @keyframes float-0 { from { transform: translateY(0px) rotate(-3deg); } to { transform: translateY(-12px) rotate(-3deg); } }
        @keyframes float-1 { from { transform: translateY(0px) rotate(2deg); } to { transform: translateY(-8px) rotate(2deg); } }
        @keyframes float-2 { from { transform: translateY(0px) rotate(1deg); } to { transform: translateY(-14px) rotate(1deg); } }
        @keyframes float-3 { from { transform: translateY(0px) rotate(-1deg); } to { transform: translateY(-10px) rotate(-1deg); } }
      `}</style>
    </section>
  );
}
