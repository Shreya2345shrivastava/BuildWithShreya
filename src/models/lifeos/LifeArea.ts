import { Schema, model, models } from "mongoose";

const LifeAreaSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  todayProgress: { type: Number, default: 0 },
  weeklyProgress: { type: Number, default: 0 },
  monthlyProgress: { type: Number, default: 0 },
  yearlyProgress: { type: Number, default: 0 },
  insights: { type: String },
  userId: { type: String, required: true },
  stats: {
    goals: { type: Number, default: 0 },
    projects: { type: Number, default: 0 },
    tasks: { type: Number, default: 0 },
    habits: { type: Number, default: 0 },
    dailyActions: { type: Number, default: 0 },
    streakScore: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
  },
}, { timestamps: true });

const LifeArea = models.LifeOS_LifeArea || model("LifeOS_LifeArea", LifeAreaSchema);
export default LifeArea;
