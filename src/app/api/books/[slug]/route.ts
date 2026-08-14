import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/Book";

// GET SINGLE BOOK
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const book = await Book.findOne({ slug });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("GET BOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch book",
      },
      { status: 500 }
    );
  }
}

// UPDATE BOOK
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await request.json();

    const {
      title,
      newSlug,
      description,
      coverImage,
      pdfUrl,
      featured,
    } = body;

    // Basic validation
    if (
      !title ||
      !newSlug ||
      !description ||
      !coverImage ||
      !pdfUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All book fields are required",
        },
        { status: 400 }
      );
    }

    let book;

    // If the parameter is a MongoDB ObjectId,
    // find the book by ID.
    if (mongoose.Types.ObjectId.isValid(slug)) {
      book = await Book.findById(slug);
    } else {
      // Otherwise, find it using the existing slug.
      book = await Book.findOne({ slug });
    }

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    // Check whether another book already uses the new slug.
    const existingBook = await Book.findOne({
      slug: newSlug,
      _id: { $ne: book._id },
    });

    if (existingBook) {
      return NextResponse.json(
        {
          success: false,
          message: "A book with this slug already exists",
        },
        { status: 409 }
      );
    }

    // Update book
    book.title = title;
    book.slug = newSlug;
    book.description = description;
    book.coverImage = coverImage;
    book.pdfUrl = pdfUrl;
    book.featured = Boolean(featured);

    await book.save();

    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    console.error("UPDATE BOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update book",
      },
      { status: 500 }
    );
  }
}

// DELETE BOOK
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    let book;

    // Support deleting by MongoDB ID
    if (mongoose.Types.ObjectId.isValid(slug)) {
      book = await Book.findByIdAndDelete(slug);
    } else {
      // Also support deleting by slug
      book = await Book.findOneAndDelete({ slug });
    }

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete book",
      },
      { status: 500 }
    );
  }
}