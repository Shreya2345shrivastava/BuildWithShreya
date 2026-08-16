import Link from "next/link";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
};

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  readingTime,
}: BlogCardProps) {
  return (
    <article className="rounded-[2rem] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-8">
      <span className="text-sm text-[var(--color-accent-peach)]">
        {category}
      </span>

      <h3 className="mt-4 font-serif text-3xl text-[var(--color-text-primary)]">
        {title}
      </h3>

      <p className="mt-4 text-[var(--color-text-secondary)]">
        {excerpt}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          {readingTime}
        </span>

        <Link
          href={`/blog/${slug}`}
          className="font-medium text-[var(--color-accent-peach)]"
        >
          Read →
        </Link>
      </div>
    </article>
  );
}