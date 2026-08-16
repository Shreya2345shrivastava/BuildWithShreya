type ResourceBenefitsProps = {
  benefits: string[];
};

export function ResourceBenefits({
  benefits,
}: ResourceBenefitsProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-serif text-5xl text-[var(--color-text-primary)]">
          What&apos;s Included
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-3xl border border-[var(--color-border-soft)] dark:border-[#2a332d] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-accent-peach)]">
                  ✓
                </span>

                <span>{benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}