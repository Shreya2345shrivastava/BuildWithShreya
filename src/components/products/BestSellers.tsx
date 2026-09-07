"use client";

import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

const BOOK_IMG =
  "https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=800&auto=format&fit=crop";
const NOTION_IMG =
  "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop";
const CREATOR_IMG =
  "https://images.unsplash.com/photo-1616628188550-808682f392a4?q=80&w=800&auto=format&fit=crop";

const bestsellers = [
  {
    id: "first-build",
    name: "First Build It, Then Make It Beautiful",
    shortName: "First Build It",
    description:
      "A complete playbook on execution. Stop overthinking and start building the projects that matter to you.",
    price: 499,
    priceDisplay: "₹499",
    category: "Books",
    rating: 5.0,
    reviews: 128,
    badge: "Bestseller",
    badgeColor: "bg-[var(--color-accent-peach)] text-white",
    image: BOOK_IMG,
  },
  {
    id: "lifeos-master",
    name: "LifeOS Master Template",
    shortName: "LifeOS Master",
    description:
      "The most comprehensive Notion system for managing your entire life — goals, habits, and projects in one place.",
    price: 1499,
    priceDisplay: "₹1,499",
    category: "LifeOS",
    rating: 4.9,
    reviews: 84,
    badge: "Popular",
    badgeColor: "bg-[#a8b69d] text-white",
    image: NOTION_IMG,
  },
  {
    id: "creator-kit",
    name: "Ultimate Creator Kit",
    shortName: "Creator Kit",
    description:
      "Everything you need to launch your personal brand — from content templates to business frameworks.",
    price: 899,
    priceDisplay: "₹899",
    category: "Resources",
    rating: 4.8,
    reviews: 56,
    badge: "New",
    badgeColor: "bg-[#c8aa6d] text-white",
    image: CREATOR_IMG,
  },
];

export function Bestsellers() {
  const { addItem } = useCart();

  return (
    <section id="bestsellers" className="py-28 px-6 bg-white dark:bg-[#0F1211]">
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
              Top Picks
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] text-black dark:text-white leading-[1.08] tracking-tight">
              Bestsellers
            </h2>
          </div>
          <Link
            href="#collections"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-200 group"
          >
            View all collections
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Bestseller Cards — full-width horizontal */}
        <div className="flex flex-col gap-5">
          {bestsellers.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col sm:flex-row bg-[var(--color-bg-ivory)] dark:bg-[#161818] rounded-3xl overflow-hidden border border-black/6 dark:border-white/6 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400"
            >
              {/* Product Image */}
              <div className="relative w-full sm:w-72 lg:w-80 shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-[#F5F1EC] dark:bg-[#1A1C1C]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                </div>

                {/* Number overlay */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-4xl font-serif font-bold text-white/20 leading-none select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-7 sm:p-8 lg:p-10 flex-grow">
                <div>
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/35">
                      {product.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" />
                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-[var(--color-accent-peach)]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="text-xs text-black/45 dark:text-white/35 font-medium">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif text-black dark:text-white mb-3 leading-snug group-hover:text-[var(--color-accent-peach)] transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-black/55 dark:text-white/45 leading-relaxed line-clamp-2 max-w-xl">
                    {product.description}
                  </p>
                </div>

                {/* Bottom row: Price + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-7 pt-7 border-t border-black/6 dark:border-white/6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-medium text-black/40 dark:text-white/30 block mb-0.5">
                      Price
                    </span>
                    <span className="text-2xl font-bold text-black dark:text-white">
                      {product.priceDisplay}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`#${product.id}`}
                      className="text-sm font-semibold text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white border border-black/12 dark:border-white/12 px-5 py-2.5 rounded-full transition-all duration-200 hover:border-black/25 dark:hover:border-white/25"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                          image: product.image,
                          category: product.category,
                        })
                      }
                      className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:scale-[1.03] hover:shadow-md transition-all duration-200"
                    >
                      <ShoppingBag size={15} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile — View all link */}
        <Link
          href="#collections"
          className="flex sm:hidden items-center justify-center gap-2 text-sm font-semibold text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white mt-8 transition-colors"
        >
          View all collections <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
