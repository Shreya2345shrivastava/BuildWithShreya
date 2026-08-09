import type { Metadata } from "next";

import {
  BlogHero,
  BlogGrid,
  FeaturedPost,
} from "@/components/blog";

export const metadata: Metadata = {
  title: "Blog | BuildWithShreya",
  description:
    "Articles on growth, productivity and intentional living.",
};

export default function BlogPage() {
  return (
    <main>
  <BlogHero />
  <FeaturedPost />
  <BlogGrid />
</main>
  );
}