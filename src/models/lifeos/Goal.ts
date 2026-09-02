import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    priority: { type: String, enum: ["P1", "P2", "P3", "P4"], required: true },
    goalType: { type: String, enum: ["Year", "Quarter", "Month", "Week", "Today"], required: true },
    startDate: { type: Date },
    targetDate: { type: Date },
    dueDate: { type: Date },
    completedDate: { type: Date },
    estimatedHours: { type: Number },
    actualHours: { type: Number },
    status: { type: String, enum: ["not_started", "in_progress", "completed", "archived"], default: "not_started" },
    progress: { type: Number, default: 0 },
    parentGoalId: { type: String },
    lifeAreaId: { type: String },
    linkedTasks: { type: [String], default: [] },
    linkedHabits: { type: [String], default: [] },
    milestoneIds: { type: [String], default: [] },
    notes: { type: String },
    userId: { type: String, required: true },
}, { timestamps: true });

const Goal = models.LifeOS_Goal || model("LifeOS_Goal", GoalSchema);
export default Goal;
