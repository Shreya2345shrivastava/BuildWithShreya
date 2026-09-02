import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/Book";
import { z } from "zod";

const BookCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().optional(),
  pdfFile: z.string().optional(),
  featured: z.boolean().optional(),
});

// GET ALL BOOKS
export async function GET() {
  try {
    await connectDB();

    const books = await Book.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("GET BOOKS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch books",
      },
      {
        status: 500,
      }
    );
  }
}

// CREATE BOOK
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const validated = BookCreateSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ success: false, message: "Invalid request data" }, { status: 400 });
    }

    const book = await Book.create({
      title: validated.data.title,
      slug: validated.data.slug,
      description: validated.data.description,
      coverImage: validated.data.coverImage,
      pdfFile: validated.data.pdfFile,
      featured: validated.data.featured ?? false,
    });

    return NextResponse.json(
      {
        success: true,
        book,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create book",
      },
      {
        status: 500,
      }
    );
  }
}