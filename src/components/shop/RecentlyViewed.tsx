"use client";

import { useEffect, useState } from "react";
import { UniversalProductCard } from "./UniversalProductCard";
import { useShop, Product } from "./ShopProvider";

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const { quickViewProduct } = useShop();

  useEffect(() => {
    // Load from local storage
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      try {
        setRecentProducts(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    // When a product is quick-viewed, add it to recently viewed
    if (quickViewProduct) {
      setRecentProducts(prev => {
        // Remove if already exists to move it to the front
        const filtered = prev.filter(p => p.id !== quickViewProduct.id);
        const next = [quickViewProduct, ...filtered].slice(0, 3); // Keep only 3
        
        localStorage.setItem("recentlyViewed", JSON.stringify(next));
        return next;
      });
    }
  }, [quickViewProduct]);

  if (recentProducts.length === 0) return null;

  return (
    <section className="border-t border-black/5 dark:border-white/5 bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-16 px-6">
      <div className="max-w-[1200px] mx-auto w-full">
        <h2 className="text-sm font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-8">
          Recently Viewed
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProducts.map(product => (
            <UniversalProductCard key={`recent-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
