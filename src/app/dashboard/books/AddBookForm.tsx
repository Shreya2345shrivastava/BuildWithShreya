"use client";

import { useState } from "react";
import FileUpload from "@/components/ui/FileUpload";

export default function AddBookForm() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    coverImage: "",
    pdfFile: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validate files are uploaded
    if (!form.coverImage) {
      alert("Please upload a cover image.");
      return;
    }

    if (!form.pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

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
        alert("Book added successfully!");

        setForm({
          title: "",
          slug: "",
          description: "",
          coverImage: "",
          pdfFile: "",
          featured: false,
        });
      } else {
        alert("Failed to add book");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <input
        type="text"
        placeholder="Book Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="w-full border p-3 rounded"
      />

      <input
        type="text"
        placeholder="Slug"
        value={form.slug}
        onChange={(e) =>
          setForm({ ...form, slug: e.target.value })
        }
        className="w-full border p-3 rounded"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        className="w-full border p-3 rounded"
        rows={4}
      />

      <FileUpload
        name="coverImage"
        type="coverImage"
        defaultValue={form.coverImage}
        onChange={(url) =>
          setForm((prev) => ({ ...prev, coverImage: url }))
        }
      />

      <FileUpload
        name="pdfFile"
        type="pdf"
        defaultValue={form.pdfFile}
        onChange={(url) =>
          setForm((prev) => ({ ...prev, pdfFile: url }))
        }
      />

      <label className="flex items-center gap-2">
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
        Featured Book
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
