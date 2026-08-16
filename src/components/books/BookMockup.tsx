import Image from "next/image";

import { cn } from "@/lib/utils";

type BookMockupProps = { className?: string; visible?: boolean };

export function BookMockup({ className, visible = true }: BookMockupProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[22rem] transition-all duration-700 ease-out sm:max-w-[25rem] lg:mx-0 lg:max-w-[28rem] motion-reduce:transition-none", visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute -inset-x-10 top-[14%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(217,164,143,0.34),rgba(255,235,221,0.18)_38%,transparent_70%)] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-7 top-8 hidden h-36 w-24 opacity-45 lg:block">
        <Image src="/images/hero/hero-leaves.svg" alt="" width={180} height={180} className="h-auto w-full" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 -bottom-8 h-16 rounded-full bg-[rgba(32,25,19,0.18)] blur-2xl" />

      <div className="float-gentle relative overflow-hidden rounded-[2.5rem] border border-[color-mix(in_srgb,var(--color-border-soft)_86%,transparent)] bg-[linear-gradient(180deg,rgba(255,250,244,0.98),rgba(245,231,219,0.72))] p-3 shadow-[0_30px_70px_rgba(32,25,19,0.14)] backdrop-blur-[10px] motion-reduce:animate-none sm:p-4">
        <div className="rounded-[2rem] border border-[color-mix(in_srgb,var(--color-border-soft)_82%,transparent)] bg-[var(--color-surface-primary)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-4">
          <div className="flex items-center justify-between rounded-[1.45rem] border border-[color-mix(in_srgb,var(--color-border-soft)_78%,transparent)] bg-[rgba(255,250,244,0.86)] px-4 py-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-peach)]/70" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-gold)]/60" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-sage)]/60" />
            </div>
            <span className="text-caption font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">Book Preview</span>
          </div>

          <div className="relative mt-3 overflow-hidden rounded-[1.6rem] border border-[color-mix(in_srgb,var(--color-border-soft)_80%,transparent)] bg-[linear-gradient(180deg,#fffaf4_0%,#f7efe6_100%)] p-4 sm:p-5">
            <div aria-hidden="true" className="absolute left-1/2 top-0 h-20 w-2/3 -translate-x-1/2 rounded-full bg-[rgba(217,164,143,0.14)] blur-3xl" />
            <div className="relative mb-4 flex items-center justify-center"><div className="h-1.5 w-24 rounded-full bg-[rgba(32,25,19,0.09)]" /></div>
            <div className="relative overflow-hidden rounded-[1.35rem] border border-[color-mix(in_srgb,var(--color-border-soft)_78%,transparent)] bg-[var(--color-bg-ivory)] dark:bg-[#131715] shadow-[0_20px_40px_rgba(32,25,19,0.14)]">
              <Image src="/images/books/book-cover.jpeg" alt="Book cover for Build it. Then make it Beautiful." width={960} height={1440} priority sizes="(max-width: 640px) 78vw, (max-width: 1024px) 60vw, 440px" className="h-auto w-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
