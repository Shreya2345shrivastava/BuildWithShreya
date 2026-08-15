import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const uploadType = formData.get("type") as string; // 'coverImage' or 'pdf'

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Validate size and type based on uploadType
    const maxSize = uploadType === "pdf" ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB or 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: `File size exceeds the limit of ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (uploadType === "coverImage" && !validImageTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid image format. Only JPG, PNG, and WEBP are allowed." },
        { status: 400 }
      );
    }

    if (uploadType === "pdf" && file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, message: "Invalid file format. Only PDF is allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(file.name);
    // Sanitize filename
    const sanitizedName = file.name.replace(extension, "").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `${sanitizedName}-${uniqueSuffix}${extension}`;
    
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json(
      { success: true, url: fileUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file" },
      { status: 500 }
    );
  }
}
