import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { readFile } from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import Order from "@/lib/models/Order";
import { Book } from "@/models/Book";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const format = searchParams.get("format");
  const bookId = searchParams.get("bookId");
  const inline = searchParams.get("inline") === "1";

  if (format && format !== "pdf") {
    return NextResponse.json({ error: "Only PDF downloads are available" }, { status: 400 });
  }

  await connectDB();
  const orderQuery: Record<string, unknown> = {
    status: "completed",
    customerEmail: session.user.email.toLowerCase(),
  };

  if (token) {
    orderQuery.downloadToken = token;
  } else if (bookId) {
    orderQuery.bookId = bookId;
  }

  const order = await Order.findOne(orderQuery).lean<{ bookId: string }>();

  if (!order) {
    return NextResponse.json({ error: "You do not own this download" }, { status: 403 });
  }

  const bookQuery = mongoose.Types.ObjectId.isValid(order.bookId)
    ? { _id: order.bookId }
    : { slug: order.bookId };
  const book = await Book.findOne(bookQuery).lean<{ pdfFile: string }>();

  if (!book?.pdfFile) {
    return NextResponse.json({ error: "The purchased file is unavailable" }, { status: 404 });
  }

  const filename = path.basename(book.pdfFile);
  const filePath = path.join(process.cwd(), "private-uploads", filename);

  try {
    const file = await readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "The purchased file is unavailable" }, { status: 404 });
  }
}
