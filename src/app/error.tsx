"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-2xl border border-black/[0.04] bg-white p-8 shadow-sm sm:p-12 max-w-lg w-full">
        <h2 className="font-serif text-2xl text-gray-900 mb-3">
          Oops, something went wrong!
        </h2>
        <p className="text-gray-600 mb-8">
          We're sorry, but an unexpected error occurred. You can try again or return home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-full bg-[#D9895B] px-6 py-2.5 font-medium text-white transition hover:bg-[#C27A51] w-full sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full bg-gray-100 px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200 w-full sm:w-auto"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
