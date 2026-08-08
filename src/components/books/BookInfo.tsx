import { cn } from "@/lib/utils";

type BookInfoProps = { className?: string; visible?: boolean };

export function BookInfo({ className, visible = true }: BookInfoProps) {
  return (
    <div className={cn("w-full max-w-[600px] min-w-0 transition-all duration-700 ease-out motion-reduce:transition-none", visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0", className)}>
      <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(217,164,143,0.3)] bg-[rgba(255,250,244,0.76)] px-3.5 py-2 shadow-[0_5px_15px_rgba(32,25,19,0.04)]">
        <span aria-hidden="true" className="text-sm leading-none text-[var(--color-accent-peach)]">★</span>
        <span className="text-caption font-medium text-[var(--color-text-secondary)]">Loved by creators &amp; students</span>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <span className="text-label text-[var(--color-accent-peach)]">First Book</span>
        <span aria-hidden="true" className="h-px w-10 bg-[var(--color-accent-peach)]/45" />
      </div>

      <h2 id="book-showcase-title" className="mt-5 max-w-none text-5xl leading-[0.95] tracking-[-0.05em] text-[var(--color-text-primary)] lg:text-7xl">
        Build it.<br />Then make it<br />Beautiful.
      </h2>

      <p className="mt-7 max-w-[36rem] text-lg leading-relaxed text-[var(--color-text-secondary)] text-">
        A practical guide for creators, students, and dreamers. Learn how to build meaningful projects, stay consistent, and turn ideas into reality.
      </p>

      <div className="mt-9">
        <button type="button" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent-peach)] px-8 py-4 text-button text-[var(--color-text-inverse)] shadow-[0_12px_28px_rgba(217,164,143,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(217,164,143,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-ivory)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
          Get the Book <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
        </button>
        <p className="mt-3 pl-1 text-caption text-[var(--color-text-muted)]">Digital PDF <span aria-hidden="true">•</span> Instant Access</p>
      </div>

      <div className="mt-9 flex items-start gap-3 border-t border-[var(--color-border-soft)]/70 pt-6">
        <div className="flex -space-x-1.5 pt-0.5" aria-hidden="true">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-bg-ivory)] bg-[#d9a48f] text-[0.55rem] text-white">S</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-bg-ivory)] bg-[#b8a18c] text-[0.55rem] text-white">A</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-bg-ivory)] bg-[#a8b69d] text-[0.55rem] text-white">M</span>
        </div>
        <p className="text-caption leading-6 text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-text-primary)]">4.9/5 reader rating</span> from 1,000+ inspired readers</p>
      </div>
    </div>
  );
}
