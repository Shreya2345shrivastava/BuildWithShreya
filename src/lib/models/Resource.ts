import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  thumbnailUrl: string;
  downloads: number;
  status: "Draft" | "Published";
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    fileUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    downloads: { type: Number, default: 0 },
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  },
  { timestamps: true }
);

const Resource = mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema);

export default Resource;
