import Link from "next/link";
import { blogPosts } from "@/data/blogs";

export function FeaturedPost() {
  const featured = blogPosts.find(
    (post) => post.featured
  );

  if (!featured) return null;

  return (
    <section className="pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-10">
          <span className="text-sm font-medium text-[var(--color-accent-peach)]">
            FEATURED ARTICLE
          </span>

          <h2 className="mt-4 font-serif text-5xl text-[var(--color-text-primary)]">
            {featured.title}
          </h2>

          <p className="mt-6 max-w-2xl text-[var(--color-text-secondary)]">
            {featured.excerpt}
          </p>

          <Link
            href={`/blog/${featured.slug}`}
            className="mt-8 inline-flex rounded-full bg-[var(--color-accent-peach)] px-6 py-3 text-white"
          >
            Read Article
          </Link>
        </div>
      </div>
    </section>
  );
}