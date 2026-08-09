export function AboutStory() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-medium tracking-[0.2em] text-[var(--color-accent-peach)]">
              MY STORY
            </span>

            <h2 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)]">
              Building With Purpose
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              BuildWithShreya started with a simple belief:
              meaningful growth should be practical,
              intentional and accessible.
            </p>

            <p>
              Through books, planners, resources and
              educational content, the goal is to help
              people create clarity, build better habits
              and move confidently toward their goals.
            </p>

            <p>
              Every resource is designed to be useful,
              beautiful and actionable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}