export function NewsletterBenefits() {
  const benefits = [
    "Career growth strategies",
    "Productivity systems",
    "Weekly learning resources",
    "Mindset and self-improvement",
    "Exclusive content",
    "Practical action steps",
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-5xl text-[var(--color-text-primary)]">
            Why Subscribe?
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-3xl border border-[var(--color-border-soft)] bg-white p-8"
            >
              <div className="text-2xl">✨</div>

              <h3 className="mt-4 text-xl font-semibold">
                {benefit}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}