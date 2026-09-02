import mongoose from "mongoose";

const JournalEntrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    date: { type: Date, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.JournalEntry || mongoose.model("JournalEntry", JournalEntrySchema);
