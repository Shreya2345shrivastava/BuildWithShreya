"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UniversalProductCard } from "./UniversalProductCard";
import { Product } from "./ShopProvider";
import { ChevronDown, SlidersHorizontal, SearchX, Zap } from "lucide-react";

const CATEGORIES = ["All", "Books", "Resources", "LifeOS", "Templates"];
const SORT_OPTIONS = ["Newest", "Most Popular", "Price: Low to High", "Price: High to Low"];

// Dummy data for products
const MOCK_PRODUCTS: Product[] = [
  { id: "template-1", type: "Template", title: "SaaS Starter Kit", price: "$49", description: "Complete landing page for SaaS apps.", image: "/images/previews/all/mini-website.jpg", category: "Templates", badge: "Best Seller" },
  { id: "template-2", type: "Template", title: "Creator Portfolio", price: "$39", description: "Minimalist portfolio for designers.", image: "/images/previews/all/mini-website.jpg", category: "Templates" },
  { id: "book-1", type: "Book", title: "Build It Beautiful", price: "$19", description: "The framework that started it all.", image: "/images/books/book-cover.jpeg", category: "Books", badge: "Most Popular" },
  { id: "book-2", type: "Book", title: "Launch Fast", price: "$15", description: "Stop overthinking and ship.", image: "/images/books/book-cover.jpeg", category: "Books" },
  { id: "resource-1", type: "Resource", title: "Brand Identity Kit", price: "$25", description: "Figma files for instant branding.", image: "/images/previews/all/resources.jpg", category: "Resources" },
  { id: "resource-2", type: "Resource", title: "Copywriting Prompts", price: "$10", description: "100 prompts to break writer's block.", image: "/images/previews/all/resources.jpg", category: "Resources", badge: "New" },
  { id: "lifeos-1", type: "LifeOS", title: "Creator LifeOS", price: "$35", description: "Notion system for ultimate focus.", image: "/images/previews/all/lifeos.jpg", category: "LifeOS" },
  { id: "template-3", type: "Template", title: "Newsletter Hub", price: "$29", description: "Grow your audience with this sleek hub.", image: "/images/previews/all/mini-website.jpg", category: "Templates" }
];

export function ShopCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = activeCategory === "All" 
      ? [...MOCK_PRODUCTS] 
      : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

    // Sort Logic (Phase 9)
    if (activeSort === "Price: Low to High") {
      result.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (activeSort === "Price: High to Low") {
      result.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }
    // "Newest" and "Most Popular" would rely on real data flags. For now, keep original array order.

    return result;
  }, [activeCategory, activeSort]);

  const popularAlternatives = MOCK_PRODUCTS.filter(p => p.badge === "Best Seller" || p.badge === "Most Popular").slice(0, 3);

  return (
    <section className="py-16 px-6 bg-[var(--color-bg-ivory)] dark:bg-[#131715] min-h-screen border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1200px] mx-auto w-full">

        {/* Controls Row (Phase B: Sticky & Counts) */}
        <div className="sticky top-20 z-40 bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-4 pb-4 border-b border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 shadow-sm">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? MOCK_PRODUCTS.length : MOCK_PRODUCTS.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  id={cat === "All" ? undefined : cat.toLowerCase()}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-105" 
                      : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
                >
                  {cat} <span className="opacity-50 ml-1 font-normal">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#1C201E] border border-black/10 dark:border-white/10 text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors shadow-sm"
            >
              <SlidersHorizontal size={16} />
              Sort By: {activeSort}
              <ChevronDown size={16} className={`ml-1 opacity-50 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1C201E] rounded-xl shadow-xl border border-black/10 dark:border-white/10 overflow-hidden z-20"
                >
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setActiveSort(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${activeSort === option ? 'bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)] font-semibold' : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Featured Templates Row (Phase C) */}
            {activeCategory === "All" && (
              <div className="col-span-full mb-6">
                <h3 className="text-sm font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-6 flex items-center gap-2">
                  <Zap size={16} className="text-[var(--color-accent-peach)] fill-current" />
                  Featured Templates
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularAlternatives.map(product => (
                    <UniversalProductCard key={`featured-grid-${product.id}`} product={product} />
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <UniversalProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Smart Empty State (Phase 7) */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 text-black/40 dark:text-white/40">
              <SearchX size={32} />
            </div>
            <h3 className="font-serif text-2xl text-black dark:text-white mb-3">We couldn't find exactly that.</h3>
            <p className="text-black/50 dark:text-white/50 max-w-md mb-12">
              But don't worry, here are some popular alternatives that other builders love.
            </p>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {popularAlternatives.map(product => (
                <UniversalProductCard key={`alt-${product.id}`} product={product} />
              ))}
            </div>

            <button 
              onClick={() => setActiveCategory("All")}
              className="mt-12 px-6 py-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
