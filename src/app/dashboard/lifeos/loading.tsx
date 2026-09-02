"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { MotionPageWrapper } from "@/components/dashboard/lifeos/MotionPageWrapper";

export default function LoadingLifeOS() {
  return (
    <MotionPageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-[var(--color-text-muted)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-botanical-leaf)]" />
        <span className="text-sm font-medium">Initializing LifeOS...</span>
      </div>
    </MotionPageWrapper>
  );
}
