import type { Metadata } from "next";

import {
  BookHero,
  FeaturedBook,
  BookGrid,
} from "@/components/books";

export const metadata: Metadata = {
  title: "Books | BuildWithShreya",
  description:
    "Explore premium ebooks, workbooks and digital resources from BuildWithShreya.",
};

export default function BooksPage() {
  return (
    <main className="fade-in">
      <BookHero />

      <section className="pb-24">
        <FeaturedBook />
      </section>

      <BookGrid />
    </main>
  );
}