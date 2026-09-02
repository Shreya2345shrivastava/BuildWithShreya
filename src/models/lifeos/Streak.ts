import { Schema, model, models } from "mongoose";

const StreakSchema = new Schema({
  title: { type: String, required: true },
  days: { type: Number, default: 0 },
  lastCompleted: { type: Date },
  userId: { type: String, required: true },
}, { timestamps: true });

const Streak = models.LifeOS_Streak || model("LifeOS_Streak", StreakSchema);
export default Streak;
