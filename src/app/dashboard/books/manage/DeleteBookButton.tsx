"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteBookButtonProps {
  slug: string;
  title: string;
}

export default function DeleteBookButton({
  slug,
  title,
}: DeleteBookButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/books/${slug}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete book");
      }

      alert("✅ Book deleted successfully");

      router.refresh();
    } catch (error) {
      console.error("Delete book error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the book."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      title={loading ? "Deleting..." : `Delete ${title}`}
      className="flex items-center justify-center rounded-2xl border border-red-200 px-4 py-3 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={18} />

      {loading && (
        <span className="ml-2 text-sm">
          Deleting...
        </span>
      )}
    </button>
  );
}
