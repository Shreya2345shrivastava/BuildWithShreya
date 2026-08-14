import Link from "next/link";
import Image from "next/image";

interface IBook {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

async function getBooks() {
  const res = await fetch(
    "http://localhost:3000/api/books",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}

export default async function BooksPage() {
  const data = await getBooks();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Digital Library
        </h1>

        <p className="text-lg text-gray-600">
          Explore premium ebooks and learning resources.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.books.map((book: IBook) => (
          <div
            key={book._id}
            className="border border-black/[0.04] bg-white rounded-2xl p-5 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="bg-gray-100 rounded-xl p-4">
              <Image
                src={book.coverImage}
                alt={book.title}
                width={300}
                height={400}
                className="w-full h-80 object-contain rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-semibold mt-5">
              {book.title}
            </h2>

            <p className="text-gray-600 mt-3 line-clamp-4">
              {book.description}
            </p>

            <Link
              href={`/books/${book.slug}`}
              className="inline-block mt-5 px-5 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}