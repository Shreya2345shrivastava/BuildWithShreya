import mongoose from "mongoose";

const QuarterlyReviewSchema = new mongoose.Schema(
  {
    quarter: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    summary: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

QuarterlyReviewSchema.index({ userId: 1, quarter: 1 }, { unique: true });

export default mongoose.models.QuarterlyReview || mongoose.model("QuarterlyReview", QuarterlyReviewSchema);
