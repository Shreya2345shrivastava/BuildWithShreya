import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatProps = { value: string; label: string; icon: LucideIcon; className?: string };

export function BookStats({ value, label, icon: Icon, className }: StatProps) {
  return (
    <div className={cn("group flex min-h-[8.25rem] flex-col items-center justify-center rounded-[1.5rem] border border-[color-mix(in_srgb,var(--color-border-soft)_88%,transparent)] bg-[rgba(255,250,244,0.88)] px-4 py-5 text-center shadow-[0_8px_20px_rgba(32,25,19,0.04)] backdrop-blur-[6px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[rgba(217,164,143,0.35)] hover:shadow-[0_14px_28px_rgba(32,25,19,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0", className)}>
      <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(217,164,143,0.12)] text-[var(--color-accent-peach)] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none" aria-hidden="true"><Icon size={15} strokeWidth={1.8} /></span>
      <div className="font-serif text-[1.45rem] font-semibold leading-none tracking-[-0.03em] text-[var(--color-text-primary)]">{value}</div>
      <span className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}
