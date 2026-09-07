"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Book, Hammer, Sparkles, LayoutTemplate, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "books",
    name: "Books",
    description: "Digital books, guides, frameworks, playbooks",
    icon: Book,
    count: 3,
    href: "#books",
  },
  {
    id: "resources",
    name: "Resources",
    description: "Templates, worksheets, creator tools, checklists",
    icon: Hammer,
    count: 12,
    href: "#resources",
  },
  {
    id: "lifeos",
    name: "LifeOS",
    description: "Productivity systems, planners, trackers, organization tools",
    icon: Sparkles,
    count: 1,
    href: "#lifeos",
  },
  {
    id: "websites",
    name: "Website Templates",
    description: "Ready-made website templates",
    icon: LayoutTemplate,
    count: 4,
    href: "/shop#mini-websites",
  },
];

export function CategoryGrid() {
  return (
    <section id="categories" className="py-24 px-6 bg-[var(--color-bg-ivory)] dark:bg-[#131715]">
      <div className="max-w-[1200px] mx-auto w-full">
        
        <div className="flex flex-col mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif text-black dark:text-white mb-4 tracking-tight">Shop by Category</h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl">Find exactly what you need to build, launch, and scale your creative projects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={category.href} className="group relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/10 dark:hover:border-white/10 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] overflow-hidden">
                  
                  {/* Subtle Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-peach)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center justify-between mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F8F5F1] dark:bg-[#121515] border border-black/5 dark:border-white/5 group-hover:scale-105 transition-transform duration-300">
                      <Icon size={20} className="text-black/80 dark:text-white/80" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60">
                      {category.count} Products
                    </span>
                  </div>
                  
                  <h3 className="relative text-xl font-semibold text-black dark:text-white mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="relative text-sm text-black/60 dark:text-white/50 leading-relaxed mb-8 flex-grow">
                    {category.description}
                  </p>
                  
                  <div className="relative flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-peach)] mt-auto group-hover:gap-3 transition-all duration-300">
                    View Collection <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
