import mongoose, { Schema, models } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Book =
  models.Book || mongoose.model("Book", BookSchema);