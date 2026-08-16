export function ResourceHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      {/* Immersive Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/20 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-accent-sage)]/20 dark:bg-[#2A332D]/40 blur-[150px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="h-px w-8 bg-[var(--color-accent-peach)]/60" />
          <span className="text-sm font-bold tracking-[0.3em] text-[var(--color-accent-peach)] uppercase">
            Resource Library
          </span>
          <div className="h-px w-8 bg-[var(--color-accent-peach)]/60" />
        </div>

        <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[var(--color-text-primary)] mb-8 tracking-tight leading-[1.05]">
          Tools Designed <br className="hidden sm:block" />
          <span className="italic text-[var(--color-accent-peach)]">For Real Growth.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[var(--color-text-secondary)] font-light">
          Trackers, planners, worksheets, and digital resources meticulously crafted to help you stay focused, organized, and intentional.
        </p>
      </div>
    </section>
  );
}