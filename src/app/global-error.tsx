"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
          <h2 className="font-serif text-3xl text-gray-900 mb-4">
            Something went critically wrong!
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            We've been notified of the issue. Please try refreshing the page or contact support if the problem persists.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-full bg-[#D9895B] px-8 py-3 font-medium text-white transition hover:bg-[#C27A51]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
