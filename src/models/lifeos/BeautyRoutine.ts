import mongoose from "mongoose";

const BeautyRoutineSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    morningCompleted: { type: Boolean, default: false },
    eveningCompleted: { type: Boolean, default: false },
    notes: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

BeautyRoutineSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.BeautyRoutine || mongoose.model("BeautyRoutine", BeautyRoutineSchema);
