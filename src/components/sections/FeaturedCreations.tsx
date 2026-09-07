"use client";

import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
};

const popularProducts = [
  { id: 1, type: "Website Template", title: "SaaS Starter Kit", price: "$49", description: "Complete landing page for SaaS apps.", image: "/images/previews/all/mini-website.jpg", span: "md:col-span-2 lg:col-span-2" },
  { id: 2, type: "Website Template", title: "Creator Portfolio", price: "$39", description: "Minimalist portfolio for designers.", image: "/images/previews/all/mini-website.jpg", span: "md:col-span-2 lg:col-span-2" },
  { id: 3, type: "Website Template", title: "Newsletter Hub", price: "$29", description: "Grow your audience with this sleek hub.", image: "/images/previews/all/mini-website.jpg", span: "md:col-span-2 lg:col-span-2" },
  { id: 4, type: "Book", title: "Build It Beautiful", price: "$19", description: "The framework that started it all.", image: "/images/books/book-cover.jpeg", span: "md:col-span-3 lg:col-span-1" },
  { id: 5, type: "Book", title: "Launch Fast", price: "$15", description: "Stop overthinking and ship.", image: "/images/books/book-cover.jpeg", span: "md:col-span-3 lg:col-span-1" },
  { id: 6, type: "Resource", title: "Brand Identity Kit", price: "$25", description: "Figma files for instant branding.", image: "/images/previews/all/resources.jpg", span: "md:col-span-3 lg:col-span-1" },
  { id: 7, type: "Resource", title: "Copywriting Prompts", price: "$10", description: "100 prompts to break writer's block.", image: "/images/previews/all/resources.jpg", span: "md:col-span-3 lg:col-span-1" },
  { id: 8, type: "LifeOS", title: "Creator LifeOS", price: "$35", description: "Notion system for ultimate focus.", image: "/images/previews/all/lifeos.jpg", span: "md:col-span-3 lg:col-span-2" }
];

export function FeaturedCreations() {
  return (
    <section className="relative bg-[#F8F4EF] dark:bg-[#131715] py-24 lg:py-32 overflow-hidden transition-colors duration-500">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D9A38F] rounded-full blur-[200px] opacity-[0.1] dark:opacity-[0.05] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D9A38F] rounded-full blur-[150px] opacity-[0.1] dark:opacity-[0.05] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <Container width="wide" className="relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-xs font-semibold tracking-widest text-[#0B1110] dark:text-[#F6F2EE] uppercase mb-6 backdrop-blur-md">
              Featured Products
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-[#0B1110] dark:text-[#F6F2EE] mb-6 leading-[1.05] tracking-tight">
              Popular <span className="italic text-[#D9A38F]">Right Now.</span>
            </h2>
            <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
              Our highest-rated tools, templates, and frameworks.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {popularProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              transition={{ delay: idx * 0.05 }}
              className={`group ${product.span} relative flex flex-col rounded-3xl bg-white dark:bg-[#1C201E] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/10 dark:hover:border-white/10`}
            >
              <Link href="/shop" className="block relative w-full aspect-[4/3] overflow-hidden bg-[#F6F2EE] dark:bg-black/50">
                <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-black dark:text-white border border-black/5 dark:border-white/10">
                  {product.type}
                </div>
              </Link>
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Link href="/shop" className="font-serif text-xl text-[#0B1110] dark:text-[#F6F2EE] hover:text-[#D9A38F] transition-colors leading-tight">{product.title}</Link>
                  <span className="font-semibold text-lg text-[#0B1110] dark:text-[#F6F2EE] shrink-0">{product.price}</span>
                </div>
                <p className="text-sm text-black/60 dark:text-white/60 flex-grow leading-relaxed">{product.description}</p>

                {/* Premium footer — replaces Add to Cart */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-black/5 dark:border-white/5">
                  <span className="text-xs font-medium text-black/40 dark:text-white/30 tracking-wide">View Product</span>
                  <Link
                    href="/shop"
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-black/15 dark:border-white/15 text-black/40 dark:text-white/40 group-hover:bg-[#0B1110] group-hover:text-white dark:group-hover:bg-[#F6F2EE] dark:group-hover:text-black group-hover:border-transparent transition-all duration-300"
                    aria-label="View product"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
