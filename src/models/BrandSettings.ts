import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBrandSettings extends Document {
  email: string;
  brandName?: string;
  brandDescription?: string;
  brandLogo?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  colorPrimary?: string;
  colorAccent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSettingsSchema: Schema<IBrandSettings> = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    brandName: { type: String, trim: true, default: "BuildWithShreya" },
    brandDescription: { type: String, trim: true, default: "The Calm Creator's Platform" },
    brandLogo: { type: String }, // Stored as base64 or URL
    website: { type: String, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    colorPrimary: { type: String, default: "#201913" }, // Default text-primary
    colorAccent: { type: String, default: "#d9a48f" }, // Default accent-peach
  },
  { timestamps: true }
);

export const BrandSettings: Model<IBrandSettings> = mongoose.models.BrandSettings || mongoose.model<IBrandSettings>("BrandSettings", BrandSettingsSchema);
