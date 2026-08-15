import { TrendingUp, LayoutTemplate, Library, BrainCircuit, Crown, Target } from "lucide-react";

export function NewsletterBenefits() {
  const benefits = [
    { title: "Career growth strategies", icon: <TrendingUp className="text-[var(--color-accent-peach)]" size={24} /> },
    { title: "Productivity systems", icon: <LayoutTemplate className="text-[var(--color-accent-peach)]" size={24} /> },
    { title: "Weekly learning resources", icon: <Library className="text-[var(--color-accent-peach)]" size={24} /> },
    { title: "Mindset & self-improvement", icon: <BrainCircuit className="text-[var(--color-accent-peach)]" size={24} /> },
    { title: "Exclusive content", icon: <Crown className="text-[var(--color-accent-peach)]" size={24} /> },
    { title: "Practical action steps", icon: <Target className="text-[var(--color-accent-peach)]" size={24} /> },
  ];

  return (
    <section className="py-32 bg-[#FCF8F2]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-text-primary)] font-medium">
            Why Subscribe?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">Everything you need to build better, faster, and smarter.</p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative overflow-hidden rounded-3xl border border-white bg-white/40 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white/80"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-peach)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                {benefit.icon}
              </div>

              <h3 className="relative z-10 mt-6 text-xl font-medium text-[var(--color-text-primary)]">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}