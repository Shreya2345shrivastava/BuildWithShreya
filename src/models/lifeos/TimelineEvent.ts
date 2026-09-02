import { Schema, model, models } from "mongoose";

const TimelineEventSchema = new Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  type: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
}, { timestamps: true });

const TimelineEvent = models.LifeOS_TimelineEvent || model("LifeOS_TimelineEvent", TimelineEventSchema);
export default TimelineEvent;
