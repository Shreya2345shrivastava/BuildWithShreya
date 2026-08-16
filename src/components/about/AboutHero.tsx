export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715] dark:bg-[#0F1211] py-32 sm:py-48 text-[var(--color-text-primary)] dark:text-white transition-colors duration-300">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--color-accent-peach)]/10 dark:bg-[#E8D4C8]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-sage)]/20 dark:bg-[#2A332D]/40 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-peach)]/30 bg-[var(--color-accent-peach)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)] backdrop-blur-md">
          ABOUT BUILDWITHSHREYA
        </span>

        <h1 className="mt-8 font-serif text-5xl tracking-tight sm:text-7xl lg:text-8xl">
          Helping People <br/>Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-peach)] to-[#D9895B] dark:to-[#E8D4C8] italic">Better Lives</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl text-[var(--color-text-secondary)] dark:text-white/70 leading-relaxed">
          Through books, resources, systems and practical
          guidance designed for intentional growth.
        </p>
      </div>
    </section>
  );
}