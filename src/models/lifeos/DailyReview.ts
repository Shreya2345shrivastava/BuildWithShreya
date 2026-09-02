import mongoose from "mongoose";

const DailyReviewSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    wins: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

DailyReviewSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.DailyReview || mongoose.model("DailyReview", DailyReviewSchema);
