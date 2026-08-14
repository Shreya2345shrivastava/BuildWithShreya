import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/Book";

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

    const book = await Book.create({
      title: body.title,
      slug: body.slug,
      description: body.description,
      coverImage: body.coverImage,
      pdfUrl: body.pdfUrl,
      featured: body.featured ?? false,
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