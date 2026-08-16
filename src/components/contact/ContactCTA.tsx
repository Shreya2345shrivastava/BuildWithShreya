import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715] dark:bg-[#0F1211] py-40 text-[var(--color-text-primary)] dark:text-white transition-colors duration-300 border-t border-black/5 dark:border-white/5">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-peach)]/10 dark:from-[var(--color-accent-peach)]/20 to-transparent opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-peach)]/5 dark:bg-[var(--color-accent-peach)]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-5xl sm:text-7xl">
          Explore <br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-peach)] to-[#D9895B] dark:to-[#E8D4C8]">More</span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-[var(--color-text-secondary)] dark:text-white/70">
          Discover books, resources and tools meticulously designed
          to help you grow intentionally.
        </p>

        <Link
          href="/books"
          className="group mx-auto mt-12 inline-flex items-center justify-center rounded-full bg-[var(--color-accent-peach)] dark:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-10 py-5 font-medium text-white dark:text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[var(--color-accent-peach)] dark:hover:bg-gray-100 hover:shadow-2xl"
        >
          Browse Books
          <ArrowRight size={18} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}