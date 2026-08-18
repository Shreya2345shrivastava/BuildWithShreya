"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight, BookOpen, Download, Star } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui";

const purchaseOptions = [
  {
    title: "Amazon Kindle",
    price: "$9.99",
    features: [
      "Read on Kindle devices",
      "Sync across devices",
      "Trusted Amazon purchase",
      "Available worldwide"
    ],
    buttonText: "Read on Kindle",
    buttonLink: "#amazon-link",
    icon: BookOpen,
    isFeatured: false,
  },
  {
    title: "Gumroad",
    price: "$14.99",
    features: [
      "Instant PDF access",
      "Mobile + desktop",
      "Download forever",
      "Creator-friendly purchase"
    ],
    buttonText: "Get Instant Access",
    buttonLink: "#gumroad-link",
    icon: Download,
    isFeatured: false,
  },
  {
    title: "BuildWithShreya Premium Edition",
    price: "$29.99",
    features: [
      "Direct creator support",
      "Bonus workbook",
      "Reflection pages",
      "Future updates included",
      "Exclusive resources"
    ],
    buttonText: "Get Premium Edition",
    buttonLink: "#website-link",
    icon: Star,
    isFeatured: true,
  }
];

export function PurchaseSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715]">
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-soft)] dark:via-[#2a332d] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,_var(--tw-gradient-stops))] from-[var(--color-accent-peach)]/5 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <Container>
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)] mb-6 tracking-tight leading-tight">
              Choose How You&apos;d Like to Read
            </h2>
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-2xl mx-auto">
              Read on Kindle, download instantly, or support directly through BuildWithShreya.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative z-10 max-w-6xl mx-auto items-center">
          {purchaseOptions.map((option, index) => {
            const Icon = option.icon;
            const isFeatured = option.isFeatured;

            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative group flex flex-col h-full rounded-3xl transition-all duration-500 ease-out ${
                  isFeatured 
                    ? "bg-[var(--color-surface-elevated)] dark:bg-[#242b28] border border-[var(--color-accent-peach)]/40 shadow-[0_30px_60px_rgba(217,137,91,0.12)] md:-translate-y-4 md:scale-[1.02] z-10" 
                    : "bg-[var(--color-surface-elevated)] dark:bg-[#1a201d] border border-[var(--color-border-soft)] dark:border-[#2a332d] shadow-sm hover:shadow-xl hover:-translate-y-2 z-0"
                }`}
              >
                {/* Glassy overlay effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {isFeatured && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
                    <span className="bg-[var(--color-accent-peach)] text-white text-[10px] uppercase tracking-widest font-bold py-1.5 px-4 rounded-full shadow-md">
                      Featured Edition
                    </span>
                  </div>
                )}

                <div className="p-8 sm:p-10 flex flex-col flex-grow relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                    isFeatured 
                      ? "bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)]" 
                      : "bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
                  }`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-2">{option.title}</h3>
                  <div className="text-4xl font-light text-[var(--color-text-primary)] mb-8 tracking-tight">
                    {option.price}
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} strokeWidth={2.5} className={`shrink-0 mt-0.5 ${isFeatured ? "text-[var(--color-accent-peach)]" : "text-[var(--color-text-secondary)]"}`} />
                        <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={option.buttonLink}
                    className={`group/btn relative overflow-hidden flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isFeatured
                        ? "bg-[var(--color-text-primary)] text-[var(--color-surface-elevated)] hover:shadow-lg hover:opacity-90"
                        : "bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-primary)] border border-[var(--color-border-soft)] dark:border-[#2a332d] hover:border-[var(--color-text-primary)] dark:hover:border-white/20 hover:shadow-md"
                    }`}
                  >
                    <span className="relative z-10">{option.buttonText}</span>
                    <ArrowUpRight size={16} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    {isFeatured && (
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out rounded-xl" />
                    )}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bonus Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 sm:mt-32 max-w-2xl mx-auto text-center relative z-10 pt-16"
        >
          {/* Subtle separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[var(--color-border-soft)] dark:bg-[#2a332d]" />
          
          <h3 className="font-serif text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-4">
            Not Ready Yet?
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-8 text-lg font-light">
            Start with the free sample.
          </p>
          <Link 
            href="/sample"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-transparent border border-[var(--color-border-soft)] dark:border-[#2a332d] text-[var(--color-text-primary)] text-xs font-bold tracking-[0.2em] uppercase hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-surface-elevated)] transition-all duration-500"
          >
            Read Free Sample
            <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
