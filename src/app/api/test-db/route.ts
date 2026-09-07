import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { authorizationErrorResponse, requireRole } from "@/lib/auth/authorization";

export async function GET() {
  try {
    await requireRole("admin");
  } catch (error) {
    return authorizationErrorResponse(error);
  }

  try {
    const db = await connectDB();

    return NextResponse.json({
      success: true,
      readyState: db.connection.readyState,
      database: db.connection.name,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error,
    });
  }
}