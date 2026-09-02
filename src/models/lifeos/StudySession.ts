import mongoose from "mongoose";

const StudySessionSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.StudySession || mongoose.model("StudySession", StudySessionSchema);
