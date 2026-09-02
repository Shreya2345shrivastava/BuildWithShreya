import mongoose from "mongoose";

const CreatorTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["idea", "scripting", "filming", "editing", "published"], 
      required: true 
    },
    publishDate: { type: Date },
    url: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.CreatorTask || mongoose.model("CreatorTask", CreatorTaskSchema);
