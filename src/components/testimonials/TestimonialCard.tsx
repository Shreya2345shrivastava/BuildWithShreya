type TestimonialCardProps = {
  name: string;
  review: string;
};

export function TestimonialCard({
  name,
  review,
}: TestimonialCardProps) {
  return (
    <div
      className="
        flex h-full flex-col items-center text-center
        rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d]
        bg-[var(--color-bg-ivory)] dark:bg-[#131715]/40
        p-8
        transition-colors
        duration-300
        hover:bg-[var(--color-bg-ivory)] dark:bg-[#131715]
      "
    >
      <div className="mb-5 text-4xl leading-none text-[var(--color-accent-peach)] opacity-60">
        “
      </div>

      <div className="mb-4 flex gap-1 text-[var(--color-accent-peach)] text-sm tracking-widest">
        ★★★★★
      </div>

      <p className="mb-8 text-base leading-relaxed text-[var(--color-text-secondary)] italic">
        &quot;{review}&quot;
      </p>

      <div className="mt-auto">
        <h4 className="text-sm font-semibold tracking-widest text-[var(--color-text-primary)] uppercase">
          — {name}
        </h4>
      </div>
    </div>
  );
}