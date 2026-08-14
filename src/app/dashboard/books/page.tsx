"use client";

import Image from "next/image";

import { useState } from "react";

export default function AddBookPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    coverImage: "",
    pdfUrl: "",
    featured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-"),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("✨ Book Added Successfully");

        setForm({
          title: "",
          slug: "",
          description: "",
          coverImage: "",
          pdfUrl: "",
          featured: false,
        });
      } else {
        alert(
          data.message ||
            "Failed to add book"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-[32px] border border-[#E8DED5] bg-gradient-to-r from-[#FFFDFB] to-[#F8F4EF] p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[#D9895B]">
          Publishing Studio
        </p>

        <h1 className="mt-3 font-serif text-5xl text-[#3A332D]">
          Add New Book
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Create a beautiful digital book experience
          for your readers.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_400px]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-[#E8DED5] bg-white p-8"
        >
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#3A332D]">
                Book Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Build Your Dream Life"
                className="w-full rounded-2xl border border-[#E8DED5] px-5 py-4 outline-none focus:border-[#D9895B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#3A332D]">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#E8DED5] px-5 py-4 outline-none focus:border-[#D9895B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#3A332D]">
                Description
              </label>

              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-[#E8DED5] px-5 py-4 outline-none focus:border-[#D9895B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#3A332D]">
                Cover Image URL
              </label>

              <input
                type="text"
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="/images/books/book-cover.jpeg"
                required
                className="w-full rounded-2xl border border-[#E8DED5] px-5 py-4 outline-none focus:border-[#D9895B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#3A332D]">
                PDF URL
              </label>

              <input
                type="text"
                name="pdfUrl"
                value={form.pdfUrl}
                onChange={handleChange}
                placeholder="/ebooks/book1.pdf"
                required
                className="w-full rounded-2xl border border-[#E8DED5] px-5 py-4 outline-none focus:border-[#D9895B]"
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-[#E8DED5] p-4">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured: e.target.checked,
                  })
                }
              />

              <span className="text-[#3A332D]">
                Feature this book on homepage
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#D9895B] py-4 font-medium text-white transition hover:bg-[#C97B4C]"
            >
              {loading
                ? "Publishing..."
                : "Publish Book"}
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="sticky top-6">
          <div className="overflow-hidden rounded-[32px] border border-[#E8DED5] bg-white">
            <div className="bg-[#F8F4EF] p-8">
              {form.coverImage ? (
                <Image
                  src={form.coverImage}
                  alt="Preview"
                  width={300}
                  height={400}
                  className="mx-auto h-80 w-auto object-contain"
                />
              ) : (
                <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-[#E8DED5] text-gray-400">
                  Cover Preview
                </div>
              )}
            </div>

            <div className="p-6">
              <h2 className="font-serif text-3xl text-[#3A332D]">
                {form.title || "Book Title"}
              </h2>

              <p className="mt-2 text-[#D9895B]">
                /{form.slug || "book-slug"}
              </p>

              <p className="mt-4 text-gray-600">
                {form.description ||
                  "Your book description will appear here."}
              </p>

              {form.featured && (
                <div className="mt-5 inline-flex rounded-full bg-[#FCE8D8] px-4 py-2 text-sm text-[#D9895B]">
                  ✨ Featured Book
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}