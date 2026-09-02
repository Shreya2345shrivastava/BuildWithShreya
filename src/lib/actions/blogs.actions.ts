"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { BlogSchema, BlogUpdateSchema } from "@/lib/validations";
import { z } from "zod";

// GET BLOGS
export async function getBlogs(query: string = "", status: string = "All Posts") {
  try {
    await connectDB();
    
    const filter: Record<string, unknown> = {};
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ] as unknown;
    }
    
    if (status === "Published") {
      filter.status = "Published";
    } else if (status === "Drafts") {
      filter.status = "Draft";
    }
    
    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// CREATE BLOG
export async function createBlog(data: z.infer<typeof BlogSchema>) {
  try {
    const validated = BlogSchema.parse(data);
    await connectDB();
    
    // Auto-generate slug if missing
    if (!validated.slug) {
      validated.slug = validated.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const blog = await Blog.create(validated);
    revalidatePath("/dashboard/blogs");
    return { success: true, blog: JSON.parse(JSON.stringify(blog)) };
  } catch (error: unknown) {
    console.error("Error creating blog:", error);
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return { success: false, error: "A blog with this slug already exists. Please change the title or slug." };
    }
    return { success: false, error: "Failed to create blog" };
  }
}

// UPDATE BLOG
export async function updateBlog(id: string, data: z.infer<typeof BlogUpdateSchema>) {
  try {
    const validated = BlogUpdateSchema.parse(data);
    await connectDB();
    
    let publishedAt;
    // If status is changed to published, set publishedAt
    if (validated.status === "Published") {
      const existing = await Blog.findById(id);
      if (existing && !existing.publishedAt) {
        publishedAt = new Date();
      }
    }

    const updateData = publishedAt ? { ...validated, publishedAt } : validated;

    const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true }).lean();
    revalidatePath("/dashboard/blogs");
    return { success: true, blog: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

// DELETE BLOG
export async function deleteBlog(id: string) {
  try {
    await connectDB();
    await Blog.findByIdAndDelete(id);
    revalidatePath("/dashboard/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}

// DUPLICATE BLOG
export async function duplicateBlog(id: string) {
  try {
    await connectDB();
    const original = await Blog.findById(id).lean();
    
    if (!original) throw new Error("Blog not found");
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, updatedAt, publishedAt, slug, ...rest } = original as Record<string, unknown>;
    
    const duplicateData = {
      ...rest,
      title: `${rest.title as string} (Copy)`,
      slug: `${slug}-copy-${Date.now()}`, // Ensure unique slug
      status: "Draft", // Always duplicate as draft
      views: 0 // Reset views
    };
    
    const duplicate = await Blog.create(duplicateData);
    revalidatePath("/dashboard/blogs");
    return { success: true, blog: JSON.parse(JSON.stringify(duplicate)) };
  } catch (error) {
    console.error("Error duplicating blog:", error);
    return { success: false, error: "Failed to duplicate blog" };
  }
}

// INCREMENT VIEWS
export async function incrementBlogViews(id: string) {
  try {
    await connectDB();
    await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } });
    revalidatePath("/dashboard/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error incrementing blog views:", error);
    return { success: false, error: "Failed to increment views" };
  }
}
