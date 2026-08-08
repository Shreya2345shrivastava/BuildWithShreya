"use client";

import type { HTMLAttributes } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "narrow" | "wide" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  noPadding?: boolean;
}

const widthMap: Record<ContainerWidth, string | null> = {
  default: theme.containers.desktop,
  narrow: theme.containers.laptop,
  wide: theme.containers.wide,
  full: null,
};

export function Container({
  className,
  width = "default",
  noPadding = false,
  style,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        !noPadding && "px-5 sm:px-6 lg:px-8 xl:px-10",
        className
      )}
      style={{
        maxWidth: widthMap[width] ?? undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}