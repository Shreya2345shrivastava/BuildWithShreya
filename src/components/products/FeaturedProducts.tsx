"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";

// Placeholder image URL
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1616628188550-808682f392a4?q=80&w=800&auto=format&fit=crop";

const products = [
  {
    id: "first-build",
    name: "First Build It, Then Make It Beautiful",
    description: "Learn proven systems for execution and getting out of your own way.",
    price: "499",
    category: "Books",
    rating: 5.0,
    reviews: 128,
    image: PLACEHOLDER_IMG,
  },
  {
    id: "lifeos",
    name: "LifeOS Master Template",
    description: "The ultimate Notion system for tracking goals, habits, and projects.",
    price: "1,499",
    category: "LifeOS",
    rating: 4.9,
    reviews: 84,
    image: PLACEHOLDER_IMG,
  },
  {
    id: "creator-kit",
    name: "Ultimate Creator Kit",
    description: "Everything you need to launch your personal brand.",
    price: "899",
    category: "Resources",
    rating: 4.8,
    reviews: 56,
    image: PLACEHOLDER_IMG,
  },
  {
    id: "minimal-portfolio",
    name: "Minimal Portfolio Template",
    description: "A beautifully clean website template for designers and developers.",
    price: "2,499",
    category: "Website Templates",
    rating: 5.0,
    reviews: 32,
    image: PLACEHOLDER_IMG,
  },
];

export function FeaturedProducts() {
  const { addItem } = useCart();

  return (
    <section id="all-products" className="py-24 px-6 bg-white dark:bg-[#0F1211]">
      <div className="max-w-[1200px] mx-auto w-full">
        
        <div className="flex flex-col mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif text-black dark:text-white mb-4 tracking-tight">Featured Products</h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl">Hand-picked resources designed to accelerate your growth.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col"
            >
              {/* Product Image Area */}
              <div className="relative aspect-[4/5] rounded-2xl bg-[#F5F1EC] dark:bg-[#161818] mb-5 overflow-hidden border border-black/5 dark:border-white/5">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-black dark:text-white shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                  <button 
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: parseInt(product.price.replace(/,/g, '')),
                      quantity: 1,
                      image: product.image,
                      category: product.category
                    })}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:scale-105 transition-transform" 
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={20} strokeWidth={2} />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:scale-105 transition-all" aria-label="Quick view">
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow">
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center text-[var(--color-accent-peach)]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-black/50 dark:text-white/40 font-medium">({product.reviews})</span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-semibold text-black dark:text-white mb-1.5 leading-tight group-hover:text-[var(--color-accent-peach)] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-black/60 dark:text-white/50 line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>

                {/* Price & Add to Cart (Mobile explicit) */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                  <span className="text-lg font-bold text-black dark:text-white">
                    ₹{product.price}
                  </span>
                  
                  {/* Small add to cart for mobile/tablet where hover doesn't exist */}
                  <button 
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: parseInt(product.price.replace(/,/g, '')),
                      quantity: 1,
                      image: product.image,
                      category: product.category
                    })}
                    className="lg:hidden text-xs font-semibold px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
