import mongoose from "mongoose";

const YearlyReviewSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    summary: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

YearlyReviewSchema.index({ userId: 1, year: 1 }, { unique: true });

export default mongoose.models.YearlyReview || mongoose.model("YearlyReview", YearlyReviewSchema);
