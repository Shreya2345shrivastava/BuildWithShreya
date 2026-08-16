type BookBenefitsProps = {
  benefits: string[];
};

export function BookBenefits({
  benefits,
}: BookBenefitsProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent-peach)]">
            WHAT&apos;S INSIDE
          </span>

          <h2 className="mt-4 font-serif text-5xl">
            What You&apos;ll Learn
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="
                flex
                items-center
                gap-4
                rounded-[1.5rem]
                border
                border-[var(--color-border-soft)] dark:border-[#2a332d]
                bg-[var(--color-surface-elevated)] dark:bg-[#242b28]
                p-6
              "
            >
              <span className="text-xl">
                ✨
              </span>

              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}