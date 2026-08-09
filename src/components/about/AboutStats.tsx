const stats = [
  {
    value: "10+",
    label: "Resources Created",
  },
  {
    value: "100+",
    label: "Readers Impacted",
  },
  {
    value: "20+",
    label: "Growth Frameworks",
  },
  {
    value: "∞",
    label: "Learning Journey",
  },
];

export function AboutStats() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-10 text-center"
            >
              <h3 className="font-serif text-5xl text-[var(--color-accent-peach)]">
                {stat.value}
              </h3>

              <p className="mt-3 text-[var(--color-text-secondary)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}