import { Schema, model, models } from "mongoose";

const ReflectionSchema = new Schema({
  date: { type: Date, required: true },
  note: { type: String, required: true },
  mood: { type: String, required: true },
  gratitude: { type: String },
  userId: { type: String, required: true },
}, { timestamps: true });

// Ensure one reflection per user per day
ReflectionSchema.index({ userId: 1, date: 1 }, { unique: true });

const Reflection = models.LifeOS_Reflection || model("LifeOS_Reflection", ReflectionSchema);
export default Reflection;
