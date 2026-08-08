import { Button } from "@/components/ui";

export function BookHero() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span className="text-sm font-medium tracking-[0.25em] text-[var(--color-accent-peach)]">
          BOOK COLLECTION
        </span>

        <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
          Books for Creators,
          <br />
          Dreamers & Builders
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
          Thoughtfully designed guides, workbooks and resources
          to help you grow with clarity, confidence and purpose.
        </p>

        <div className="mt-10 flex justify-center">
          <Button href="#books-grid" size="lg">
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
}