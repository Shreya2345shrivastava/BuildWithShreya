import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/Book";

async function getBook(id: string) {
  await connectDB();

  const book = await Book.findById(id).lean();

  if (!book) {
    return null;
  }

  return JSON.parse(JSON.stringify(book));
}

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  async function updateBook(formData: FormData) {
    "use server";

    await connectDB();

    const title = String(formData.get("title") || "").trim();
    const slug = String(formData.get("slug") || "").trim();
    const description = String(
      formData.get("description") || ""
    ).trim();
    const coverImage = String(
      formData.get("coverImage") || ""
    ).trim();
    const pdfUrl = String(formData.get("pdfUrl") || "").trim();
    const featured = formData.get("featured") === "on";

    if (
      !title ||
      !slug ||
      !description ||
      !coverImage ||
      !pdfUrl
    ) {
      throw new Error("All book fields are required.");
    }

    const existingBook = await Book.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingBook) {
      throw new Error(
        "A book with this slug already exists."
      );
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        description,
        coverImage,
        pdfUrl,
        featured,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      throw new Error("Book not found.");
    }

    redirect("/dashboard/books/manage");
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="rounded-[40px] border border-[#E8DED5] bg-gradient-to-r from-[#FFFDFB] to-[#F7F1EC] p-10 shadow-sm">

        <p className="text-sm uppercase tracking-[5px] text-[#D9895B]">
          Library Collection
        </p>

        <h1 className="mt-3 font-serif text-5xl text-[#3A332D]">
          Edit Book
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Update your book details, cover, description and
          publishing information.
        </p>

      </div>

      {/* Edit Form */}
      <div className="rounded-[40px] border border-[#E8DED5] bg-white p-10 shadow-sm">

        <form action={updateBook} className="space-y-8">

          {/* Book Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-[#3A332D]"
            >
              Book Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              defaultValue={book.title}
              required
              className="w-full rounded-2xl border border-[#E8DED5] bg-[#FFFDFB] px-5 py-4 text-[#3A332D] outline-none transition focus:border-[#D9895B] focus:ring-2 focus:ring-[#D9895B]/10"
              placeholder="Enter book title"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-medium text-[#3A332D]"
            >
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              defaultValue={book.slug}
              required
              className="w-full rounded-2xl border border-[#E8DED5] bg-[#FFFDFB] px-5 py-4 text-[#3A332D] outline-none transition focus:border-[#D9895B] focus:ring-2 focus:ring-[#D9895B]/10"
              placeholder="book-slug"
            />

            <p className="mt-2 text-sm text-gray-400">
              This is used in the book URL.
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[#3A332D]"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={6}
              defaultValue={book.description}
              required
              className="w-full resize-none rounded-2xl border border-[#E8DED5] bg-[#FFFDFB] px-5 py-4 text-[#3A332D] outline-none transition focus:border-[#D9895B] focus:ring-2 focus:ring-[#D9895B]/10"
              placeholder="Enter book description"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label
              htmlFor="coverImage"
              className="mb-2 block text-sm font-medium text-[#3A332D]"
            >
              Cover Image URL
            </label>

            <input
              id="coverImage"
              name="coverImage"
              type="text"
              defaultValue={book.coverImage}
              required
              className="w-full rounded-2xl border border-[#E8DED5] bg-[#FFFDFB] px-5 py-4 text-[#3A332D] outline-none transition focus:border-[#D9895B] focus:ring-2 focus:ring-[#D9895B]/10"
              placeholder="/images/books/book1.jpg"
            />
          </div>

          {/* PDF */}
          <div>
            <label
              htmlFor="pdfUrl"
              className="mb-2 block text-sm font-medium text-[#3A332D]"
            >
              PDF URL
            </label>

            <input
              id="pdfUrl"
              name="pdfUrl"
              type="text"
              defaultValue={book.pdfUrl}
              required
              className="w-full rounded-2xl border border-[#E8DED5] bg-[#FFFDFB] px-5 py-4 text-[#3A332D] outline-none transition focus:border-[#D9895B] focus:ring-2 focus:ring-[#D8895B]/10"
              placeholder="/ebooks/book1.pdf"
            />
          </div>

          {/* Featured */}
          <div className="rounded-2xl border border-[#E8DED5] bg-[#FFFDFB] p-5">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="featured"
                defaultChecked={book.featured}
                className="h-5 w-5 accent-[#D8895B]"
              />

              <div>
                <p className="font-medium text-[#3A332D]">
                  Featured Book
                </p>

                <p className="text-sm text-gray-500">
                  Show this book in featured sections.
                </p>
              </div>

            </label>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 border-t border-[#EFE6DD] pt-8">

            <button
              type="submit"
              className="rounded-2xl bg-[#D9895B] px-8 py-4 font-medium text-white transition hover:bg-[#C97B4C]"
            >
              Save Changes
            </button>

            <Link
              href="/dashboard/books/manage"
              className="rounded-2xl border border-[#D9895B] px-8 py-4 text-[#D9895B] transition hover:bg-[#FFF7F1]"
            >
              Cancel
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}