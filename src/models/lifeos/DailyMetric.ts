import { Schema, model, models } from "mongoose";

const DailyMetricSchema = new Schema({
  date: { type: Date, required: true },
  water: { type: Number, default: 0 },
  studyMinutes: { type: Number, default: 0 },
  deepWorkMinutes: { type: Number, default: 0 },
  sleepHours: { type: Number, default: 0 },
  workoutMinutes: { type: Number, default: 0 },
  userId: { type: String, required: true },
}, { timestamps: true });

// Ensure one entry per user per day
DailyMetricSchema.index({ userId: 1, date: 1 }, { unique: true });

const DailyMetric = models.LifeOS_DailyMetric || model("LifeOS_DailyMetric", DailyMetricSchema);
export default DailyMetric;
