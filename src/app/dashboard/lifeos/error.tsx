"use client";
import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { MotionPageWrapper } from "@/components/dashboard/lifeos/MotionPageWrapper";

export default function ErrorLifeOS({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MotionPageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-2">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Something went wrong!</h2>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md">
          We couldn't load your LifeOS data. Please check your connection or try again.
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 px-6 py-2.5 bg-[var(--color-surface-elevated)] border border-[var(--color-border-strong)] rounded-full text-sm font-medium hover:bg-[var(--color-surface-primary)] transition-colors flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    </MotionPageWrapper>
  );
}
