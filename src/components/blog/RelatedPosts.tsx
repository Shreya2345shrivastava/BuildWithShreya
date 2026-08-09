import Link from "next/link";
import { blogPosts } from "@/data/blogs";

type Props = {
  currentSlug: string;
};

export function RelatedPosts({
  currentSlug,
}: Props) {
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <section className="mt-24 border-t border-[var(--color-border-soft)] pt-16">
      <h2 className="font-serif text-4xl text-[var(--color-text-primary)]">
        Related Articles
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-[1.5rem] border border-[var(--color-border-soft)] p-6"
          >
            <h3 className="font-serif text-2xl">
              {post.title}
            </h3>

            <p className="mt-3 text-[var(--color-text-secondary)]">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}