import Image from "next/image";

export function AboutStory() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Side: Premium Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=1200&auto=format&fit=crop"
              alt="Workspace and journal"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Right Side: Editorial Text */}
          <div className="lg:pl-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-peach)]/30 bg-[var(--color-accent-peach)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)]">
              MY STORY
            </span>

            <h2 className="mt-6 font-serif text-4xl sm:text-5xl text-[var(--color-text-primary)] leading-tight">
              Building With <span className="italic text-[var(--color-accent-peach)]">Purpose</span>
            </h2>

            <div className="mt-10 space-y-8 text-lg sm:text-xl leading-relaxed text-[var(--color-text-secondary)]">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-[var(--color-text-primary)] first-line:uppercase first-line:tracking-widest">
                BuildWithShreya started with a simple belief:
                meaningful growth should be practical,
                intentional and completely accessible to everyone.
              </p>

              <p className="pl-6 border-l-2 border-[var(--color-accent-peach)]">
                Through books, planners, resources and
                educational content, the goal is to help
                people create clarity, build better habits
                and move confidently toward their goals.
              </p>

              <p>
                Every resource is obsessively designed to be useful,
                beautiful, and instantly actionable.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}