"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Book, Hammer, Sparkles, LayoutTemplate, Laptop, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "websites",
    name: "Website Templates",
    description: "Ready-made, beautifully designed templates. Launch in a day.",
    icon: LayoutTemplate,
    count: "4 products",
    href: "/shop/templates",
    accent: "from-[#9a8f84]/20 to-transparent",
    hoverBorder: "hover:border-[#9a8f84]/30",
    preview: ["#201913", "#6f665d", "#9a8f84"],
    span: "md:col-span-2 lg:col-span-2"
  },
  {
    id: "custom",
    name: "Custom Websites",
    description: "Get a website designed specifically for your project, brand, event, or business.",
    icon: Laptop,
    count: "Service",
    href: "/custom-websites",
    accent: "from-[#d9a48f]/10 to-transparent",
    hoverBorder: "hover:border-[#d9a48f]/30",
    preview: [],
    span: "md:col-span-1 lg:col-span-1"
  },
  {
    id: "books",
    name: "Books",
    description: "Frameworks and playbooks built from real experience. Not theory — execution.",
    icon: Book,
    count: "3 products",
    href: "/books",
    accent: "from-[#d9a48f]/25 to-[#c8aa6d]/10",
    hoverBorder: "hover:border-[#d9a48f]/40",
    preview: ["#d9a48f", "#e4bead", "#c8aa6d"],
    span: "md:col-span-1 lg:col-span-1"
  },
  {
    id: "resources",
    name: "Resources",
    description: "Templates, worksheets, and creator tools that remove the blank-page problem.",
    icon: Hammer,
    count: "12 products",
    href: "/resources",
    accent: "from-[#a8b69d]/25 to-[#a8b69d]/5",
    hoverBorder: "hover:border-[#a8b69d]/40",
    preview: ["#a8b69d", "#8fa07e", "#aeb996"],
    span: "md:col-span-1 lg:col-span-1"
  },
  {
    id: "lifeos",
    name: "LifeOS",
    description: "Complete Notion systems for tracking goals, habits, and projects at scale.",
    icon: Sparkles,
    count: "1 product",
    href: "/shop/lifeos",
    accent: "from-[#c8aa6d]/25 to-[#c8aa6d]/5",
    hoverBorder: "hover:border-[#c8aa6d]/40",
    preview: ["#c8aa6d", "#d9a48f", "#a8b69d"],
    span: "md:col-span-1 lg:col-span-1"
  }
];

export function CategoryShowcase() {
  return (
    <section id="categories" className="py-28 px-6 bg-white dark:bg-[#0F1211]">
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
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] text-black dark:text-white leading-[1.08] tracking-tight">
              Choose What You Need
            </h2>
          </div>
          <p className="text-base text-black/50 dark:text-white/40 max-w-xs leading-relaxed">
            Every product is designed around a specific creative problem.
          </p>
        </motion.div>

        {/* Category Cards (Bento Box) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                className={category.span}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={category.href}
                  onClick={(event) => {
                    if (category.id === "lifeos") {
                      event.preventDefault();
                      window.alert("LifeOS is coming soon.");
                    }
                  }}
                  aria-disabled={category.id === "lifeos"}
                  className={`group relative flex flex-col h-full p-7 rounded-3xl bg-[var(--color-bg-ivory)] dark:bg-[#161818] border border-black/6 dark:border-white/6 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${category.hoverBorder} overflow-hidden`}
                >
                  {/* Gradient wash on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl`} />

                  <div className="relative flex flex-col h-full">
                    {/* Icon + Count row */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-[#242b28] border border-black/6 dark:border-white/6 shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <Icon size={20} className="text-black/75 dark:text-white/75" strokeWidth={1.8} />
                      </div>
                      <span className="text-[11px] font-semibold tabular-nums text-black/40 dark:text-white/35 tracking-wider">
                        {category.count}
                      </span>
                    </div>

                    {/* Preview dots */}
                    {category.preview.length > 0 && (
                      <div className="flex gap-1.5 mb-6">
                        {category.preview.map((color, pi) => (
                          <div
                            key={pi}
                            className="w-5 h-5 rounded-full border-2 border-white dark:border-[#161818] transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}

                    <h3 className="text-xl font-semibold text-black dark:text-white mb-3 leading-tight">
                      {category.name}
                    </h3>

                    <p className="text-sm text-black/55 dark:text-white/45 leading-relaxed mb-8 flex-grow">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-peach)] mt-auto group-hover:gap-3 transition-all duration-300">
                      View Collection
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
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
