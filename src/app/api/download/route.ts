import { NextResponse } from "next/server";
import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const format = searchParams.get("format");

  if (!token) {
    return NextResponse.json({ error: "Missing download token" }, { status: 400 });
  }

  await connectDB();
  const order = await Order.findOne({ downloadToken: token, status: "completed" });

  if (!order) {
    return NextResponse.json({ error: "Invalid or expired download link" }, { status: 403 });
  }

  // In a real app, this would stream the file from S3 or return a signed URL.
  // For now, we return a mock success response.
  
  return NextResponse.json({ 
    message: `Securely delivering the ${format?.toUpperCase() || 'PDF'} version of the book!`,
    orderId: order._id,
    customer: order.customerEmail
  });
}
