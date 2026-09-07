"use client";

import { motion } from "framer-motion";
import { TemplateCard } from "./TemplateCard";

const CATEGORIES = ["All Templates", "Portfolio", "Birthday", "Author", "Business", "Wedding", "Creator", "Product Launch", "Personal Brand"];

const TEMPLATES = [
  { id: "1", name: "Aura", subtitle: "Minimalist portfolio for creative directors.", category: "Portfolio", price: "₹2,999", previewColor: "#E5D9C5" },
  { id: "2", name: "Midnight", subtitle: "Dark mode luxury setup for digital agencies.", category: "Business", price: "₹4,999", previewColor: "#1A1A1A" },
  { id: "3", name: "Chronicle", subtitle: "Elegant author website with book launch funnels.", category: "Author", price: "₹3,499", previewColor: "#D8C3A5" },
  { id: "4", name: "Celebrate", subtitle: "Interactive birthday memory timeline.", category: "Birthday", price: "₹1,999", previewColor: "#F4D8CD" },
  { id: "5", name: "Elysium", subtitle: "Premium wedding invitation & registry.", category: "Wedding", price: "₹2,499", previewColor: "#EAE7DC" },
  { id: "6", name: "Lumina", subtitle: "High-conversion creator link-in-bio & store.", category: "Creator", price: "₹2,999", previewColor: "#8E8D8A" },
  { id: "7", name: "Nexus", subtitle: "Product launch countdown and waitlist.", category: "Product Launch", price: "₹3,999", previewColor: "#E85A4F" },
  { id: "8", name: "Vanguard", subtitle: "Personal brand hub for coaches & consultants.", category: "Personal Brand", price: "₹4,499", previewColor: "#E98074" },
];

export function MarketplaceGrid() {
  return (
    <section id="mini-websites" className="py-16 px-6 bg-[var(--color-bg-ivory)] dark:bg-[#131715] min-h-screen">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  i === 0 
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-md" 
                    : "bg-white dark:bg-[#1A1D1C] text-black/60 dark:text-white/60 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Advanced Filter Dropdowns (Visual only for now) */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="px-4 py-2 rounded-xl bg-white dark:bg-[#1A1D1C] border border-black/10 dark:border-white/10 text-sm font-medium text-black/70 dark:text-white/70 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              Style: All
            </button>
            <button className="px-4 py-2 rounded-xl bg-white dark:bg-[#1A1D1C] border border-black/10 dark:border-white/10 text-sm font-medium text-black/70 dark:text-white/70 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              Sort: Popular
            </button>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-serif font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-black/20 dark:bg-white/20" />
            Most Popular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TEMPLATES.slice(0, 3).map((template) => (
              <TemplateCard key={template.id} {...template} />
            ))}
          </div>
        </div>

        {/* New Releases */}
        <div className="mb-20">
          <h2 className="text-2xl font-serif font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-black/20 dark:bg-white/20" />
            New Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TEMPLATES.slice(3, 6).map((template) => (
              <TemplateCard key={template.id} {...template} />
            ))}
          </div>
        </div>

        {/* All Templates */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-black/20 dark:bg-white/20" />
            All Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TEMPLATES.map((template) => (
              <TemplateCard key={`all-${template.id}`} {...template} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
