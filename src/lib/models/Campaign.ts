import mongoose, { Schema, Document } from "mongoose";

export interface ICampaign extends Document {
  subject: string;
  previewText: string;
  content: string;
  coverImage?: string;
  ctaText?: string;
  ctaUrl?: string;
  status: "Draft" | "Scheduled" | "Sent";
  recipients: number;
  opens: number;
  clicks: number;
  sentAt?: Date;
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema(
  {
    subject: { type: String, required: true },
    previewText: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    ctaText: { type: String },
    ctaUrl: { type: String },
    status: { type: String, enum: ["Draft", "Scheduled", "Sent"], default: "Draft" },
    recipients: { type: Number, default: 0 },
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    sentAt: { type: Date },
    scheduledAt: { type: Date },
  },
  { timestamps: true }
);

const Campaign = mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema);

export default Campaign;
