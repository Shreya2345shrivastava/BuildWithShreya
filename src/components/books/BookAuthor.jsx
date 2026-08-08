import Image from "next/image";

export function BookAuthor() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-10 shadow-[0_20px_60px_rgba(32,25,19,0.06)]">
          <div className="grid items-center gap-10 lg:grid-cols-[140px_1fr]">
            <div className="mx-auto">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[var(--color-accent-peach)]/10 text-4xl font-bold text-[var(--color-accent-peach)]">
                S
              </div>
            </div>

            <div>
              <span className="text-sm font-medium tracking-[0.2em] text-[var(--color-accent-peach)]">
                ABOUT THE AUTHOR
              </span>

              <h2 className="mt-4 font-serif text-4xl text-[var(--color-text-primary)]">
                Shreya Shrivastava
              </h2>

              <p className="mt-6 leading-relaxed text-[var(--color-text-secondary)]">
                Creator of BuildWithShreya, focused on helping students,
                creators and dreamers build meaningful lives through practical
                systems, thoughtful resources and actionable guidance.
              </p>

              <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
                Every book is designed to be beautiful, practical and easy to
                implement so readers can create real progress rather than just
                consume information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}