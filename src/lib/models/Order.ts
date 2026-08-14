import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  stripeSessionId: string;
  customerEmail: string;
  customerName?: string;
  bookId: string;
  amount: number;
  status: "pending" | "completed";
  downloadToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema(
  {
    stripeSessionId: { type: String, required: true, unique: true },
    customerEmail: { type: String, required: true },
    customerName: { type: String },
    bookId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    downloadToken: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
