import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    priority: { type: String, enum: ["P1", "P2", "P3", "P4"], required: true },
    status: { type: String, enum: ["not_started", "in_progress", "completed"], default: "not_started" },
    dueDate: { type: Date },
    scheduledTime: { type: Date },
    estimatedMinutes: { type: Number },
    actualMinutes: { type: Number },
    lifeAreaId: { type: String },
    tags: { type: [String], default: [] },
    completed: { type: Boolean, default: false },
    linkedGoalId: { type: String },
    userId: { type: String, required: true },
}, { timestamps: true });

const Task = models.LifeOS_Task || model("LifeOS_Task", TaskSchema);
export default Task;
