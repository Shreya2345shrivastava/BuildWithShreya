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
        h-full rounded-[28px]
        border border-[var(--color-border-soft)]
        bg-white/90
        p-8
        shadow-[0_12px_30px_rgba(32,25,19,0.05)]
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:scale-[1.02]
        hover:shadow-[0_24px_50px_rgba(32,25,19,0.10)]
      "
    >
      <div className="mb-5 text-4xl leading-none text-[var(--color-accent-peach)] opacity-60">
        “
      </div>

      <div className="mb-4 flex gap-1 text-[var(--color-accent-peach)] text-lg">
        ★★★★★
      </div>

      <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
        "{review}"
      </p>

      <div className="border-t border-[var(--color-border-soft)] pt-5">
        <h4 className="font-semibold text-[var(--color-text-primary)]">
          {name}
        </h4>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Verified Reader
        </p>
      </div>
    </div>
  );
}