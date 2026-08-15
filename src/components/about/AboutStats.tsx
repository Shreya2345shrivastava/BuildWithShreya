const stats = [
  { value: "10+", label: "Resources Created" },
  { value: "100+", label: "Readers Impacted" },
  { value: "20+", label: "Growth Frameworks" },
  { value: "∞", label: "Learning Journey" },
];

export function AboutStats() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-[var(--color-accent-peach)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border border-black/5 bg-white p-12 text-center shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="font-serif text-6xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-[var(--color-accent-peach)] to-[#D9895B] font-medium tracking-tighter">
                {stat.value}
              </h3>
              <p className="mt-6 text-sm sm:text-base font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}