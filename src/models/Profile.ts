import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProfile extends Document {
  email: string;
  name: string;
  username?: string;
  bio?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, trim: true, default: "" },
    username: { type: String, unique: true, sparse: true, trim: true, lowercase: true, minlength: 3, maxlength: 20 },
    bio: { type: String, trim: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
