import mongoose from "mongoose";

const VisionArea = {
  vision: { type: String, default: "" },
  why: { type: String, default: "" },
  currentState: { type: String, default: "" },
  targetState: { type: String, default: "" },
};

const VisionSchema = new mongoose.Schema(
  {
    career: { type: VisionArea, default: () => ({}) },
    financial: { type: VisionArea, default: () => ({}) },
    health: { type: VisionArea, default: () => ({}) },
    learning: { type: VisionArea, default: () => ({}) },
    creator: { type: VisionArea, default: () => ({}) },
    spiritual: { type: VisionArea, default: () => ({}) },
    relationships: { type: VisionArea, default: () => ({}) },
    lifestyle: { type: VisionArea, default: () => ({}) },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.LifeOS_Vision || mongoose.model("LifeOS_Vision", VisionSchema);
