import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  image?: string;
  username?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  brandName?: string;
  brandDescription?: string;
  brandLogo?: string;
  emailNotifications: boolean;
  marketingEmails: boolean;
  productUpdates: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    image: { type: String },
    username: { type: String, unique: true, sparse: true, trim: true, lowercase: true, minlength: 3, maxlength: 20 },
    bio: { type: String, trim: true },
    website: { type: String, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    brandName: { type: String, trim: true },
    brandDescription: { type: String, trim: true },
    brandLogo: { type: String }, // Stored as base64 or URL
    emailNotifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false },
    productUpdates: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
