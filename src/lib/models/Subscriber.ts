import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  name?: string;
  status: "Subscribed" | "Unsubscribed";
  source: string;
  subscribedAt: Date;
  lastOpenedAt?: Date;
}

const SubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    status: { type: String, enum: ["Subscribed", "Unsubscribed"], default: "Subscribed" },
    source: { type: String, default: "Website" },
    subscribedAt: { type: Date, default: Date.now },
    lastOpenedAt: { type: Date },
  },
  { timestamps: true }
);

const Subscriber = mongoose.models.Subscriber || mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);

export default Subscriber;
