import mongoose from "mongoose";

const HealthMetricSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    weight: { type: Number },
    calories: { type: Number },
    steps: { type: Number },
    waterOunces: { type: Number },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure only one metric entry per day per user
HealthMetricSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.HealthMetric || mongoose.model("HealthMetric", HealthMetricSchema);
