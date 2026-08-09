import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-6xl text-[var(--color-text-primary)]">
          Continue Your Growth Journey
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">
          Explore books, resources and tools designed to
          help you grow intentionally.
        </p>

        <Link
          href="/books"
          className="mt-10 inline-flex rounded-full bg-[var(--color-accent-peach)] px-8 py-4 font-medium text-white transition hover:opacity-90"
        >
          Explore Books
        </Link>
      </div>
    </section>
  );
}