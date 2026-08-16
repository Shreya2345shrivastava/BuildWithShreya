import Image from "next/image";
import Link from "next/link";

type BookCardProps = {
  slug: string;
  title: string;
  description: string;
  price: string;
  cover: string;
  featured?: boolean;
};

export function BookCard({
  slug,
  title,
  description,
  price,
  cover,
  featured,
}: BookCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[2rem]
        border
        border-[var(--color-border-soft)] dark:border-[#2a332d]
        bg-[var(--color-surface-primary)]
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="relative overflow-hidden">
        <Image
          src={cover}
          alt={title}
          width={600}
          height={800}
          className="
            h-[32rem]
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {featured && (
          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-[var(--color-accent-peach)]
              px-4
              py-1.5
              text-xs
              font-medium
              text-white
              shadow-sm
            "
          >
            ✨ Featured
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-serif text-3xl text-[var(--color-text-primary)]">
          {title}
        </h3>

        <p
          className="
            mt-3
            leading-relaxed
            text-[var(--color-text-secondary)]
          "
        >
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-semibold text-[var(--color-text-primary)]">
            {price}
          </span>

          <Link
            href={`/books/${slug}`}
            className="
              rounded-full
              bg-[var(--color-accent-peach)]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:opacity-90
            "
          >
            View Book
          </Link>
        </div>
      </div>
    </article>
  );
}