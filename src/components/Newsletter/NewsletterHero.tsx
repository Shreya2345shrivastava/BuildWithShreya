import { NewsletterForm } from "./NewsletterForm";

export function NewsletterHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715] dark:bg-[#0F1211] py-32 sm:py-48 text-[var(--color-text-primary)] dark:text-white min-h-[85vh] flex items-center justify-center transition-colors duration-300">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-sage)]/20 dark:bg-[#2A332D]/40 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-peach)]/30 bg-[var(--color-accent-peach)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-peach)] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-peach)]"></span>
          </span>
          Weekly Newsletter
        </span>

        <h1 className="mt-8 font-serif text-5xl tracking-tight sm:text-7xl lg:text-8xl">
          Grow Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-peach)] to-[#D9895B] dark:to-[#E8D4C8] italic">Week</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-[var(--color-text-secondary)] dark:text-white/70 leading-relaxed">
          Actionable insights, proven productivity systems, career growth tips, and
          curated resources delivered directly to your inbox every Sunday.
        </p>

        <NewsletterForm />
        
        <p className="mt-6 text-sm text-[var(--color-text-secondary)] dark:text-white/40 opacity-70">
          Join 10,000+ creators and dreamers. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}