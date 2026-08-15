import Link from "next/link";
import Image from "next/image";

interface IBook {
  _id: string;
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  coverImage: string;
  createdAt: string;
  pdfFile: string;
}
import {
  Search,
  BookOpen,
  Star,
  Pencil,
  Download,
} from "lucide-react";

import DeleteBookButton from "./DeleteBookButton";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/books", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}

export default async function ManageBooksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const data = await getBooks();

  const { search } = await searchParams;

  const searchTerm = search?.trim().toLowerCase() || "";

  const books = searchTerm
    ? data.books.filter((book: IBook) => {
        return (
          book.title?.toLowerCase().includes(searchTerm) ||
          book.slug?.toLowerCase().includes(searchTerm) ||
          book.description?.toLowerCase().includes(searchTerm)
        );
      })
    : data.books;

  const totalBooks = data.books.length;

  const featuredBooks = data.books.filter(
    (book: IBook) => book.featured
  ).length;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="rounded-2xl border border-[#E8DED5] bg-gradient-to-r from-[#FFFDFB] to-[#F7F1EC] p-10 shadow-sm">

        <p className="text-sm uppercase tracking-[5px] text-[#D9895B]">
          Library Collection
        </p>

        <h1 className="mt-3 font-serif text-5xl text-[#3A332D]">
          Manage Books
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Organize your published books, update content and manage
          your digital library beautifully.
        </p>

      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-[#E8DED5] bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Total Books
          </p>

          <h2 className="mt-2 font-serif text-4xl text-[#3A332D]">
            {totalBooks}
          </h2>
        </div>

        <div className="rounded-3xl border border-[#E8DED5] bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Featured Books
          </p>

          <h2 className="mt-2 font-serif text-4xl text-[#D9895B]">
            {featuredBooks}
          </h2>
        </div>

        <div className="rounded-3xl border border-[#E8DED5] bg-white p-6 shadow-sm">
          <p className="text-gray-500">
            Library Status
          </p>

          <h2 className="mt-2 font-serif text-4xl text-[#3A332D]">
            Active
          </h2>
        </div>

      </div>

      {/* Search + Add */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Search Form */}
        <form
          method="GET"
          action="/dashboard/books/manage"
          className="relative w-full md:max-w-md"
        >

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search books..."
            className="w-full rounded-2xl border border-[#E8DED5] bg-white py-3 pl-11 pr-24 outline-none transition focus:border-[#D9895B] focus:ring-2 focus:ring-[#D9895B]/10"
          />

          {searchTerm && (
            <Link
              href="/dashboard/books/manage"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 text-sm text-[#D9895B] transition hover:bg-[#FFF7F1]"
            >
              Clear
            </Link>
          )}

        </form>

        {/* Add New Book */}
        <Link
          href="/dashboard/books"
          className="rounded-2xl bg-[#D9895B] px-6 py-3 text-center text-white transition hover:bg-[#C97B4C]"
        >
          + Add New Book
        </Link>

      </div>

      {/* Search Result Information */}
      {searchTerm && (
        <div className="rounded-2xl border border-[#E8DED5] bg-[#FFFDFB] px-5 py-4 text-gray-600">
          {books.length === 0 ? (
            <span>
              No books found for{" "}
              <strong className="text-[#3A332D]">
                &quot;{search}&quot;
              </strong>
              .
            </span>
          ) : (
            <span>
              Showing{" "}
              <strong className="text-[#3A332D]">
                {books.length}
              </strong>{" "}
              {books.length === 1 ? "book" : "books"} matching{" "}
              <strong className="text-[#3A332D]">
                &quot;{search}&quot;
              </strong>
              .
            </span>
          )}
        </div>
      )}

      {/* Books Grid */}
      {books.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {books.map((book: IBook) => (
            <div
              key={book._id}
              className="group overflow-hidden rounded-2xl border border-[#E8DED5] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >

              {/* Cover */}
              <div className="relative bg-[#F8F4EF] p-8">

                {book.featured && (
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#D9895B] px-3 py-1 text-xs text-white">
                    <Star size={12} />
                    Featured
                  </div>
                )}

                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="mx-auto h-80 w-auto object-contain transition duration-300 group-hover:scale-105"
                />

              </div>

              {/* Content */}
              <div className="p-7">

                <h2 className="line-clamp-1 font-serif text-3xl text-[#3A332D]">
                  {book.title}
                </h2>

                <p className="mt-2 text-sm text-[#D9895B]">
                  /{book.slug}
                </p>

                <p className="mt-4 line-clamp-3 text-gray-600">
                  {book.description}
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  Added on{" "}
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">

                  {/* View */}
                  <Link
                    href={`/books/${book.slug}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#D9895B] py-3 text-white transition hover:bg-[#C97B4C]"
                  >
                    <BookOpen size={18} />
                    View
                  </Link>

                  {/* Download */}
                  <a
                    href={book.pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-2xl border border-green-200 px-4 py-3 text-green-600 transition hover:bg-green-50"
                    title="Open PDF"
                  >
                    <Download size={18} />
                  </a>

                  {/* Edit */}
                  <Link
                    href={`/dashboard/books/edit/${book._id}`}
                    className="flex items-center justify-center rounded-2xl border border-blue-200 px-4 py-3 text-blue-600 transition hover:bg-blue-50"
                    title="Edit book"
                  >
                    <Pencil size={18} />
                  </Link>

                  {/* Delete */}
                  <DeleteBookButton
                    slug={book.slug}
                    title={book.title}
                  />

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* No Search Results */}
      {books.length === 0 && searchTerm && (
        <div className="rounded-2xl border border-[#E8DED5] bg-white p-16 text-center shadow-sm">

          <div className="text-7xl">
            🔍
          </div>

          <h3 className="mt-6 font-serif text-4xl text-[#3A332D]">
            No Books Found
          </h3>

          <p className="mt-4 text-lg text-gray-500">
            We couldn&apos;t find any books matching{" "}
            <strong>&quot;{search}&quot;</strong>.
          </p>

          <Link
            href="/dashboard/books/manage"
            className="mt-8 inline-block rounded-2xl border border-[#D9895B] px-8 py-4 text-[#D9895B] transition hover:bg-[#FFF7F1]"
          >
            Clear Search
          </Link>

        </div>
      )}

      {/* Empty Library */}
      {totalBooks === 0 && (
        <div className="rounded-2xl border border-[#E8DED5] bg-white p-16 text-center">

          <div className="text-7xl">
            📚
          </div>

          <h3 className="mt-6 font-serif text-4xl text-[#3A332D]">
            No Books Yet
          </h3>

          <p className="mt-4 text-lg text-gray-500">
            Create your first book and start building your
            beautiful library.
          </p>

          <Link
            href="/dashboard/books"
            className="mt-8 inline-block rounded-2xl bg-[#D9895B] px-8 py-4 text-white transition hover:bg-[#C97B4C]"
          >
            Add First Book
          </Link>

        </div>
      )}

    </div>
  );
}
