import { getBlogs } from "@/lib/actions/blogs.actions";
import BlogClient from "./BlogClient";
import { Suspense } from "react";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; status?: string }>;
}) {
  const { query, status } = await searchParams;
  
  const blogs = await getBlogs(query || "", status || "All Posts");

  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center text-[#8A837D]">Loading articles...</div>}>
      <BlogClient initialBlogs={blogs} />
    </Suspense>
  );
}