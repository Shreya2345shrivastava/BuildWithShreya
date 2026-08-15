import { Search, Rocket, Minimize2, Compass } from "lucide-react";

const values = [
  {
    title: "Clarity",
    description: "Helping people focus on what truly matters.",
    icon: <Search className="text-[var(--color-accent-peach)]" size={28} />
  },
  {
    title: "Growth",
    description: "Small consistent actions create meaningful change.",
    icon: <Rocket className="text-[var(--color-accent-peach)]" size={28} />
  },
  {
    title: "Simplicity",
    description: "Complex ideas presented in practical ways.",
    icon: <Minimize2 className="text-[var(--color-accent-peach)]" size={28} />
  },
  {
    title: "Purpose",
    description: "Building intentionally rather than randomly.",
    icon: <Compass className="text-[var(--color-accent-peach)]" size={28} />
  },
];

export function AboutValues() {
  return (
    <section className="py-32 bg-[#FCF8F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-text-primary)]">
            Core Values
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">The principles that guide everything we build.</p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => (
            <div
              key={value.title}
              className="group relative overflow-hidden rounded-3xl border border-white bg-white/40 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white/80"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-peach)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                {value.icon}
              </div>

              <h3 className="relative z-10 font-serif text-2xl text-[var(--color-text-primary)]">
                {value.title}
              </h3>

              <p className="relative z-10 mt-4 leading-relaxed text-[var(--color-text-secondary)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}