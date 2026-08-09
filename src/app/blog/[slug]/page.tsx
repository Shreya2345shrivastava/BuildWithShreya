import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogs";
import { RelatedPosts } from "@/components/blog";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = blogPosts.find(
    (item) => item.slug === slug
  );

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | BuildWithShreya`,
    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const post = blogPosts.find(
    (item) => item.slug === slug
  );

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.publishedAt,

    author: {
      "@type": "Person",
      name: "Shreya",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="mx-auto max-w-4xl px-6 py-24">
        <span className="text-sm text-[var(--color-accent-peach)]">
          {post.category}
        </span>

        <h1 className="mt-4 font-serif text-6xl text-[var(--color-text-primary)]">
          {post.title}
        </h1>

        <div className="mt-4 text-sm text-[var(--color-text-secondary)]">
          {post.readingTime}
        </div>

        <article className="prose prose-lg mt-12 max-w-none">
          {post.content}
        </article>

        <RelatedPosts
          currentSlug={post.slug}
        />
      </main>
    </>
  );
}