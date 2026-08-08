import Link from "next/link";
import { books } from "@/data/books";

export function RelatedBooks({
  currentSlug,
}) {
  const relatedBooks = books.filter(
    (book) => book.slug !== currentSlug
  );



  if (relatedBooks.length === 0) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="text-sm font-medium tracking-[0.25em] text-[var(--color-accent-peach)]">
            MORE COMING SOON
          </span>

          <h2 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)]">
            More Books Are On The Way
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            New workbooks, planners, journals and creator resources
            are currently being developed.
          </p>

          <Link
            href="/books"
            className="
              mt-8 inline-flex
              rounded-full
              bg-[var(--color-accent-peach)]
              px-6
              py-3
              text-white
              transition
              hover:opacity-90
            "
          >
            Browse Collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium tracking-[0.25em] text-[var(--color-accent-peach)]">
            YOU MAY ALSO LIKE
          </span>

          <h2 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)]">
            Related Books
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedBooks.map((book) => (
            <Link
              key={book.slug}
              href={`/books/${book.slug}`}
              className="
                rounded-[2rem]
                border
                border-[var(--color-border-soft)]
                bg-white
                p-8
                shadow-[0_15px_40px_rgba(32,25,19,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
              "
            >
              <span className="text-sm text-[var(--color-accent-peach)]">
                {book.category}
              </span>

              <h3 className="mt-3 font-serif text-3xl text-[var(--color-text-primary)]">
                {book.title}
              </h3>

              <p className="mt-4 text-[var(--color-text-secondary)]">
                {book.description}
              </p>

              <div className="mt-6 font-semibold">
                {book.price}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}