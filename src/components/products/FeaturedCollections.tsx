"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Layers, LayoutTemplate } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    id: "build-systems",
    title: "Build Systems Collection",
    subtitle: "Stop planning. Start executing.",
    description:
      "A curated set of frameworks, playbooks, and guides built specifically for creators who want to move from overwhelmed to in-motion.",
    icon: BookOpen,
    products: ["First Build It", "Creator Framework", "Launch Playbook"],
    startingPrice: "₹499",
    productCount: 3,
    href: "#books",
    bg: "bg-[#1a1208] dark:bg-[#1a1208]",
    lightBg: "bg-[#fdf7ee]",
    accent: "#d9a48f",
    tag: "Most Popular",
    tagColor: "bg-[#d9a48f]",
  },
  {
    id: "lifeos",
    title: "LifeOS Collection",
    subtitle: "Your entire life. One system.",
    description:
      "Comprehensive Notion templates to manage goals, track habits, run projects, and reflect — all in a single, interconnected workspace.",
    icon: Sparkles,
    products: ["LifeOS Master Template", "Habit Tracker", "Goal Planner"],
    startingPrice: "₹1,499",
    productCount: 1,
    href: "#lifeos",
    bg: "bg-[#0f1a12] dark:bg-[#0f1a12]",
    lightBg: "bg-[#f0f4ec]",
    accent: "#a8b69d",
    tag: "Customer Favorite",
    tagColor: "bg-[#a8b69d]",
  },
  {
    id: "creator-toolkit",
    title: "Creator Toolkit",
    subtitle: "Everything to launch your brand.",
    description:
      "Templates, worksheets, and tools that remove the blank-page problem. Built for indie creators, solopreneurs, and side project builders.",
    icon: Layers,
    products: ["Creator Kit", "Brand System", "Content Calendar"],
    startingPrice: "₹299",
    productCount: 12,
    href: "#resources",
    bg: "bg-[#14100a] dark:bg-[#14100a]",
    lightBg: "bg-[#faf5ef]",
    accent: "#c8aa6d",
    tag: "New Arrivals",
    tagColor: "bg-[#c8aa6d]",
  },
  {
    id: "website-starter",
    title: "Website Starter Collection",
    subtitle: "Launch in a day.",
    description:
      "Production-ready website templates for designers, developers, and creators. Clean code. Beautiful design. Fully customizable.",
    icon: LayoutTemplate,
    products: ["Minimal Portfolio", "Studio Template", "Agency Theme"],
    startingPrice: "₹1,999",
    productCount: 4,
    href: "#websites",
    bg: "bg-[#111318] dark:bg-[#111318]",
    lightBg: "bg-[#f1f2f6]",
    accent: "#9a8f84",
    tag: "Premium",
    tagColor: "bg-[#9a8f84]",
  },
];

export function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="py-28 px-6 bg-[var(--color-bg-ivory)] dark:bg-[#131715]"
    >
      <div className="max-w-[1200px] mx-auto w-full">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)] mb-3">
              Collections
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] text-black dark:text-white leading-[1.08] tracking-tight">
              Featured Collections
            </h2>
          </div>
          <p className="text-base text-black/50 dark:text-white/40 max-w-xs leading-relaxed">
            Curated sets of products built around specific outcomes.
          </p>
        </motion.div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {collections.map((col, idx) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={col.href}
                  className="group relative flex flex-col h-full rounded-3xl overflow-hidden border border-black/8 dark:border-white/8 bg-white dark:bg-[#161818] hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-400"
                >
                  {/* Top Visual Band */}
                  <div className={`relative flex items-center justify-between p-7 ${idx % 2 === 0 ? col.bg : col.lightBg + " dark:" + col.bg.replace("bg-", "bg-")} min-h-[160px]`}>
                    {/* Dark version always */}
                    <div className={`absolute inset-0 ${col.bg}`} />

                    <div className="relative flex flex-col justify-between h-full w-full">
                      {/* Tag + Icon row */}
                      <div className="flex items-start justify-between mb-auto">
                        <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-full ${col.tagColor}`}>
                          {col.tag}
                        </span>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: col.accent + "33" }}
                        >
                          <Icon size={18} style={{ color: col.accent }} strokeWidth={1.8} />
                        </div>
                      </div>

                      {/* Product count dots */}
                      <div className="flex items-center gap-2 mt-8">
                        {col.products.slice(0, 3).map((_, pi) => (
                          <div
                            key={pi}
                            className="h-1 rounded-full transition-all duration-300 group-hover:w-8"
                            style={{
                              backgroundColor: col.accent,
                              width: pi === 0 ? "2rem" : "0.75rem",
                              opacity: pi === 0 ? 1 : 0.4,
                            }}
                          />
                        ))}
                        <span className="text-[10px] font-medium text-white/50 ml-1">
                          {col.productCount} products
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-col p-7 flex-grow">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)] mb-2">
                      {col.subtitle}
                    </p>
                    <h3 className="text-xl font-serif text-black dark:text-white mb-3 leading-snug group-hover:text-[var(--color-accent-peach)] transition-colors duration-300">
                      {col.title}
                    </h3>
                    <p className="text-sm text-black/55 dark:text-white/45 leading-relaxed mb-6 flex-grow">
                      {col.description}
                    </p>

                    {/* Products included */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {col.products.map((p, pi) => (
                        <span
                          key={pi}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/50"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-5 border-t border-black/6 dark:border-white/6 mt-auto">
                      <div>
                        <span className="text-[11px] text-black/40 dark:text-white/35 uppercase tracking-wider font-medium">
                          Starting at
                        </span>
                        <p className="text-lg font-bold text-black dark:text-white">{col.startingPrice}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-peach)] group-hover:gap-3 transition-all duration-300">
                        Explore Collection
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
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
