"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Resource from "@/lib/models/Resource";
import { ResourceSchema, ResourceUpdateSchema } from "@/lib/validations";
import { z } from "zod";

// GET RESOURCES
export async function getResources(query: string = "", category: string = "All Categories") {
  try {
    await connectDB();
    
    const filter: Record<string, unknown> = {};
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ] as unknown;
    }
    
    if (category && category !== "All Categories") {
      filter.category = category;
    }
    
    const resources = await Resource.find(filter).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(resources));
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

// CREATE RESOURCE
export async function createResource(data: z.infer<typeof ResourceSchema>) {
  try {
    const validated = ResourceSchema.parse(data);
    await connectDB();
    const resource = await Resource.create(validated);
    revalidatePath("/dashboard/resources");
    return { success: true, resource: JSON.parse(JSON.stringify(resource)) };
  } catch (error) {
    console.error("Error creating resource:", error);
    return { success: false, error: "Failed to create resource" };
  }
}

// UPDATE RESOURCE
export async function updateResource(id: string, data: z.infer<typeof ResourceUpdateSchema>) {
  try {
    const validated = ResourceUpdateSchema.parse(data);
    await connectDB();
    const updated = await Resource.findByIdAndUpdate(id, validated, { new: true }).lean();
    revalidatePath("/dashboard/resources");
    return { success: true, resource: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating resource:", error);
    return { success: false, error: "Failed to update resource" };
  }
}

// DELETE RESOURCE
export async function deleteResource(id: string) {
  try {
    await connectDB();
    await Resource.findByIdAndDelete(id);
    revalidatePath("/dashboard/resources");
    return { success: true };
  } catch (error) {
    console.error("Error deleting resource:", error);
    return { success: false, error: "Failed to delete resource" };
  }
}

// DUPLICATE RESOURCE
export async function duplicateResource(id: string) {
  try {
    await connectDB();
    const original = await Resource.findById(id).lean();
    
    if (!original) throw new Error("Resource not found");
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, updatedAt, ...rest } = original as Record<string, unknown>;
    
    const duplicateData = {
      ...rest,
      title: `${rest.title as string} (Copy)`,
      status: "Draft", // Always duplicate as draft
      downloads: 0 // Reset downloads
    };
    
    const duplicate = await Resource.create(duplicateData);
    revalidatePath("/dashboard/resources");
    return { success: true, resource: JSON.parse(JSON.stringify(duplicate)) };
  } catch (error) {
    console.error("Error duplicating resource:", error);
    return { success: false, error: "Failed to duplicate resource" };
  }
}

// INCREMENT DOWNLOADS
export async function incrementDownloads(id: string) {
  try {
    await connectDB();
    await Resource.findByIdAndUpdate(id, { $inc: { downloads: 1 } });
    revalidatePath("/dashboard/resources");
    return { success: true };
  } catch (error) {
    console.error("Error incrementing downloads:", error);
    return { success: false, error: "Failed to increment downloads" };
  }
}
