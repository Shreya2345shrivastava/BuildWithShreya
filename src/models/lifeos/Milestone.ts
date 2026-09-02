import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    goalId: { type: String, required: true },
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["not_started", "in_progress", "completed"], default: "not_started" },
    dueDate: { type: Date },
    completedDate: { type: Date },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Milestone || mongoose.model("Milestone", MilestoneSchema);
