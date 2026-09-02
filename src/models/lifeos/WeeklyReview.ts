import mongoose from "mongoose";

const WeeklyReviewSchema = new mongoose.Schema(
  {
    weekStartDate: { type: Date, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    summary: { type: String },
    goalsMet: { type: Number, default: 0 },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

WeeklyReviewSchema.index({ userId: 1, weekStartDate: 1 }, { unique: true });

export default mongoose.models.WeeklyReview || mongoose.model("WeeklyReview", WeeklyReviewSchema);
