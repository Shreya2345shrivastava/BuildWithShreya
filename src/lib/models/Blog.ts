import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string;
  status: "Draft" | "Published";
  views: number;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    category: { type: String, required: true },
    tags: { type: String }, // Stored as comma separated string for simplicity
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
    views: { type: Number, default: 0 },
    author: { type: String, default: "Shreya Shrivastava" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug if not provided or modified
BlogSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  if (this.isModified("status") && this.status === "Published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
