import { blogPosts } from "@/data/blogs";
import { BlogCard } from "./BlogCard";

export function BlogGrid() {
  return (
    <section className="pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}