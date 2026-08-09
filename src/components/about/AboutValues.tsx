const values = [
  {
    title: "Clarity",
    description:
      "Helping people focus on what truly matters.",
  },
  {
    title: "Growth",
    description:
      "Small consistent actions create meaningful change.",
  },
  {
    title: "Simplicity",
    description:
      "Complex ideas presented in practical ways.",
  },
  {
    title: "Purpose",
    description:
      "Building intentionally rather than randomly.",
  },
];

export function AboutValues() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-5xl text-[var(--color-text-primary)]">
            Core Values
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-8"
            >
              <h3 className="font-serif text-3xl text-[var(--color-text-primary)]">
                {value.title}
              </h3>

              <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}