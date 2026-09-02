import mongoose from "mongoose";

const MonthlyReviewSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    summary: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

MonthlyReviewSchema.index({ userId: 1, month: 1 }, { unique: true });

export default mongoose.models.MonthlyReview || mongoose.model("MonthlyReview", MonthlyReviewSchema);
