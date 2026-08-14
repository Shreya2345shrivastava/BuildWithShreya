import mongoose, { Document, Model, Schema } from "mongoose";

export interface INotificationSettings extends Document {
  email: string;
  newSubscriberAlerts: boolean;
  newsletterSignupAlerts: boolean;
  newBookPurchaseAlerts: boolean;
  blogCommentAlerts: boolean;
  weeklySummaryEmail: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSettingsSchema: Schema<INotificationSettings> = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    newSubscriberAlerts: { type: Boolean, default: true },
    newsletterSignupAlerts: { type: Boolean, default: true },
    newBookPurchaseAlerts: { type: Boolean, default: true },
    blogCommentAlerts: { type: Boolean, default: true },
    weeklySummaryEmail: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationSettings: Model<INotificationSettings> = mongoose.models.NotificationSettings || mongoose.model<INotificationSettings>("NotificationSettings", NotificationSettingsSchema);
