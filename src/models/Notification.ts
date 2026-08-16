import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false }, // If null, global notification to all admins
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["system", "subscriber", "purchase", "comment", "resource"],
      default: "system"
    },
    isRead: { type: Boolean, default: false },
    link: { type: String, required: false }
  },
  { timestamps: true }
);

export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
