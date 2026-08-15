"use client";

import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      action="https://formspree.io/f/xkjwobve"
      method="POST"
      className="relative mx-auto mt-10 flex w-full max-w-lg items-center rounded-full bg-white/60 dark:bg-white/10 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-black/5 dark:border-white/20 focus-within:ring-2 focus-within:ring-[var(--color-accent-peach)] focus-within:ring-offset-2 focus-within:ring-offset-transparent transition-all duration-300"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your best email..."
        className="flex-1 bg-transparent px-6 py-3.5 text-[var(--color-text-primary)] dark:text-white placeholder-black/40 dark:placeholder-white/60 outline-none w-full"
      />
      <button
        type="submit"
        className="group flex items-center justify-center rounded-full bg-[var(--color-accent-peach)] px-8 py-3.5 font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-[#D9895B]"
      >
        Subscribe
        <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}