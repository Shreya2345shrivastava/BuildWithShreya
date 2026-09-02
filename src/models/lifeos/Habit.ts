import { Schema, model, models } from "mongoose";

const HabitSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  lifeAreaId: { type: String },
  linkedGoalIds: [{ type: String }],
  frequency: { type: String, enum: ["daily", "weekly", "monthly", "custom"], default: "daily" },
  targetCount: { type: Number, default: 1 },
  currentCount: { type: Number, default: 0 },
  unit: { type: String },
  priority: { type: String, enum: ["P1", "P2", "P3", "P4"] },
  status: { type: String, enum: ["Active", "Paused", "Completed", "Archived"], default: "Active" },
  startDate: { type: Date },
  endDate: { type: Date },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 },
  completionHistory: [{
    date: { type: Date },
    count: { type: Number },
    status: { type: String, enum: ["completed", "partial", "skipped", "missed"] }
  }],
  notes: { type: String },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Habit = models.LifeOS_Habit || model("LifeOS_Habit", HabitSchema);
export default Habit;
