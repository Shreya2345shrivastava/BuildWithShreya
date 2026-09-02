import { z } from "zod";

// --- Newsletter & Campaign Validation ---
export const SubscriberSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

export const CampaignSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  previewText: z.string().min(1, "Preview text is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  ctaText: z.string().optional(),
  ctaUrl: z.string().optional(),
  status: z.enum(["Draft", "Scheduled", "Sent"]).default("Draft"),
});

// --- Blog Validation ---
export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  status: z.enum(["Draft", "Published"]).default("Draft"),
});

export const BlogUpdateSchema = BlogSchema.partial();

// --- Resource Validation ---
export const ResourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  fileUrl: z.string().min(1, "File URL is required"),
  thumbnailUrl: z.string().optional(),
  status: z.enum(["Draft", "Published"]).default("Draft"),
});

export const ResourceUpdateSchema = ResourceSchema.partial();

// --- Settings Validation ---
export const ProfileUpdateSchema = z.object({
  name: z.string().optional(),
  username: z.string().regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes").optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
});

export const BrandUpdateSchema = z.object({
  brandName: z.string().optional(),
  brandDescription: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  brandLogo: z.string().optional(),
  colorPrimary: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color").optional(),
  colorAccent: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color").optional(),
});

export const NotificationUpdateSchema = z.object({
  newSubscriberAlerts: z.boolean(),
  newsletterSignupAlerts: z.boolean(),
  newBookPurchaseAlerts: z.boolean(),
  blogCommentAlerts: z.boolean(),
  weeklySummaryEmail: z.boolean(),
});
