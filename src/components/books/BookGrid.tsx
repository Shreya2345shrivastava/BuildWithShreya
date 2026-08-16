import { books } from "@/data/books";
import { BookCard } from "./BookCard";

export function BookGrid() {
  if (!books.length) {
    return (
      <section className="border-t border-[var(--color-border-soft)] dark:border-[#2a332d] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-4xl text-[var(--color-text-primary)]">
            New Books Coming Soon
          </h2>

          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            We are currently working on new books, guides, and premium
            workbooks for creators, students, and dreamers.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="books-grid"
      className="border-t border-[var(--color-border-soft)] dark:border-[#2a332d] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent-peach)]">
            Collection
          </span>

          <h2 className="mt-4 font-serif text-5xl text-[var(--color-text-primary)]">
            Explore All Books
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Beautifully crafted books, workbooks, and digital resources
            designed to help you grow personally and professionally.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.slug}
              slug={book.slug}
              title={book.title}
              description={book.description}
              price={book.price}
              cover={book.cover}
              featured={book.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}