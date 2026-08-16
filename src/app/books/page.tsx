import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";

interface IBook {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/Book";

async function getBooks() {
  await connectDB();
  const books = await Book.find().sort({ createdAt: -1 }).lean();
  return { books: JSON.parse(JSON.stringify(books)) };
}

export default async function BooksPage() {
  const data = await getBooks();

  return (
    <main className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] min-h-screen transition-colors duration-300">
      {/* Cinematic Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-32">
        {/* Immersive Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/20 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-accent-sage)]/20 dark:bg-[#2A332D]/40 blur-[150px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-[var(--color-accent-peach)]/60" />
            <span className="text-sm font-bold tracking-[0.3em] text-[var(--color-accent-peach)] uppercase">
              Digital Library
            </span>
            <div className="h-px w-8 bg-[var(--color-accent-peach)]/60" />
          </div>

          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[var(--color-text-primary)] mb-8 tracking-tight leading-[1.05]">
            Ideas You Can <br className="hidden sm:block" />
            <span className="italic text-[var(--color-accent-peach)]">Actually Build.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[var(--color-text-secondary)] font-light">
            Explore premium ebooks and guides beautifully designed to help you gain clarity, build habits, and take real action.
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="pb-32 relative z-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.books.map((book: IBook) => (
              <article
                key={book._id}
                className="group relative rounded-[2rem] border border-[var(--color-border-soft)] dark:border-[#2a332d]/60 bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-[0_15px_40px_rgba(32,25,19,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(32,25,19,0.1)] flex flex-col h-full"
              >
                {/* Image Area with Premium Backdrop */}
                <div className="relative aspect-[4/5] w-full rounded-t-[2rem] overflow-hidden bg-gradient-to-br from-[#FDF8F3] to-[#F5ECE5] p-8 flex flex-col items-center justify-center">
                  {/* Subtle Texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D9895B]/10 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(217,137,91,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(217,137,91,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  {/* The Book Mockup */}
                  <div className="relative z-10 w-full max-w-[220px] shadow-[0_30px_60px_rgba(32,25,19,0.15)] transform group-hover:scale-[1.05] group-hover:-rotate-2 transition-all duration-700 ease-out border border-white/40 rounded-sm">
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/20 to-transparent z-20" />
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={400}
                      height={600}
                      className="w-full h-auto object-cover rounded-r-sm"
                      priority
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-8 pt-8 pb-8 relative z-20 bg-[var(--color-surface-elevated)] dark:bg-[#242b28] rounded-b-[2rem] flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={14} className="text-[var(--color-accent-peach)]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-peach)]">
                      Ebook
                    </p>
                  </div>

                  <h3 className="font-serif text-3xl text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-accent-peach)] transition-colors duration-300">
                    {book.title}
                  </h3>

                  <p className="leading-relaxed text-[var(--color-text-secondary)] text-sm mb-8 line-clamp-3 flex-grow">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-soft)] dark:border-[#2a332d]/50 mt-auto">
                    <Link
                      href={`/books/${book.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--color-accent-peach)] group-hover:text-[#B86B42] transition-colors"
                    >
                      Read Details
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg-ivory)] dark:bg-[#131715] group-hover:bg-[var(--color-accent-peach)] group-hover:text-white transition-colors duration-300">
                        <ArrowUpRight size={16} strokeWidth={2} />
                      </div>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}