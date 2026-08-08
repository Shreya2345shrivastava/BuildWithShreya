"use client";

import { useEffect, useRef, useState } from "react";
import { Carousel, type PreviewPage } from "./Carousel";
import { cn } from "@/lib/utils";

export const previewPages: PreviewPage[] = [
  { src: "/images/previews/page-1.jpg", alt: "Reflection workbook page preview" },
  { src: "/images/previews/page-2.jpg", alt: "Project planning workbook page preview" },
  { src: "/images/previews/page-3.jpg", alt: "Goal setting workbook page preview" },
  { src: "/images/previews/page-4.jpg", alt: "Creative challenge workbook page preview" },
  { src: "/images/previews/page-5.jpg", alt: "Weekly review workbook page preview" },
];

export function PreviewGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="preview-gallery-title"
      className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-6",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        )}
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[420px] lg:shrink-0">
            <span className="text-label text-[var(--color-accent-peach)]">
              The Workbook
            </span>

            <h2
              id="preview-gallery-title"
              className="mt-4 text-5xl leading-[0.95] tracking-[-0.045em] lg:text-6xl"
            >
              Peek Inside
            </h2>

            <p
              className="
                mt-6
                max-w-[36rem]
                text-lg
                leading-relaxed
                text-[var(--color-text-secondary)]
              "
            >
              A glimpse into the pages that will inspire your journey.
            </p>

            <div
              aria-hidden="true"
              className="mt-8 h-px w-16 bg-[var(--color-accent-peach)]/55"
            />

            <p className="mt-8 text-sm text-[var(--color-text-muted)]">
              Tap a page to read it full size.
            </p>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="min-w-0 flex-1">
            <Carousel pages={previewPages} />
          </div>
        </div>
      </div>
    </section>
  );
}