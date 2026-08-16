"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";

import { PreviewCard } from "./PreviewCard";

export type PreviewPage = {
  src: string;
  alt: string;
};

type CarouselProps = {
  pages: PreviewPage[];
};

export function Carousel({ pages }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const move = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;

    if (!track) return;

    const amount = Math.min(track.clientWidth * 0.82, 380) * direction;
    const next = track.scrollLeft + amount;

    const atEnd =
      next >= track.scrollWidth - track.clientWidth - 4;

    const atStart = next <= 4;

    track.scrollTo({
      left:
        direction > 0 && atEnd
          ? 0
          : direction < 0 && atStart
          ? track.scrollWidth
          : next,
      behavior: "smooth",
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const changeLightboxPage = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) =>
        current === null
          ? current
          : (current + direction + pages.length) % pages.length,
      );
    },
    [pages.length],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activeIndex !== null) {
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") changeLightboxPage(-1);
        if (event.key === "ArrowRight") changeLightboxPage(1);
        return;
      }

      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, changeLightboxPage, closeLightbox, move]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  if (!pages.length) return null;

  return (
    <>
      <div>
        <div
          ref={trackRef}
          role="region"
          aria-label="Book page previews"
          tabIndex={0}
          onTouchStart={(event) => {
            touchStart.current =
              event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            const end = event.changedTouches[0]?.clientX;

            if (
              start !== null &&
              end !== undefined &&
              Math.abs(start - end) > 45
            ) {
              move(start > end ? 1 : -1);
            }

            touchStart.current = null;
          }}
          className="
            flex
            w-full
            max-w-full
            snap-x
            snap-mandatory
            gap-5
            overflow-x-auto
            px-6
            pb-6
            pt-2
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-6
            sm:px-8
            lg:px-10
          "
        >
          {pages.map((page, index) => (
            <PreviewCard
              key={page.src}
              src={page.src}
              alt={page.alt}
              onOpen={() => setActiveIndex(index)}
              className="w-[72vw] shrink-0 snap-center sm:w-[38vw] lg:w-[19rem]"
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Show previous previews"
            className="
              flex h-12 w-12 items-center justify-center
              rounded-full
              border border-[var(--color-border-soft)] dark:border-[#2a332d]
              bg-[rgba(255,250,244,0.92)]
              text-[var(--color-text-primary)]
              shadow-[0_10px_24px_rgba(32,25,19,0.08)]
              backdrop-blur-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:scale-105
              hover:border-[var(--color-accent-peach)]
              hover:shadow-[0_18px_34px_rgba(32,25,19,0.12)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-focus)]
            "
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-caption text-[var(--color-text-muted)]">
            Swipe to explore
          </span>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Show next previews"
            className="
              flex h-12 w-12 items-center justify-center
              rounded-full
              border border-[var(--color-border-soft)] dark:border-[#2a332d]
              bg-[rgba(255,250,244,0.92)]
              text-[var(--color-text-primary)]
              shadow-[0_10px_24px_rgba(32,25,19,0.08)]
              backdrop-blur-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:scale-105
              hover:border-[var(--color-accent-peach)]
              hover:shadow-[0_18px_34px_rgba(32,25,19,0.12)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-focus)]
            "
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {activeIndex !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Expanded book page preview"
            onMouseDown={closeLightbox}
            className="
              fixed inset-0 z-[100]
              flex h-dvh w-screen
              items-center justify-center
              overflow-y-auto
              bg-[rgba(0,0,0,0.88)]
              p-5
              backdrop-blur-md
              sm:p-10
            "
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close preview"
              className="
                absolute right-5 top-5
                flex h-11 w-11 items-center justify-center
                rounded-full
                bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10
                text-white
                transition-colors
                hover:bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/20
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                sm:right-8 sm:top-8
              "
            >
              <X />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeLightboxPage(-1);
              }}
              aria-label="Previous preview"
              className="
                absolute left-3 top-1/2
                hidden h-12 w-12
                -translate-y-1/2
                items-center justify-center
                rounded-full
                bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10
                text-white
                hover:bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/20
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                sm:flex
              "
            >
              <ChevronLeft />
            </button>

            <div
              onMouseDown={(event) => event.stopPropagation()}
              className="
                relative
                flex
                max-h-[calc(100dvh-3rem)]
                w-full
                max-w-[min(88vw,42rem)]
                items-center
                justify-center
                overflow-hidden
                rounded-[2rem]
                bg-[var(--color-surface-elevated)] dark:bg-[#242b28]
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              "
            >
              <Image
                src={pages[activeIndex].src}
                alt={pages[activeIndex].alt}
                width={1024}
                height={1536}
                priority
                sizes="(max-width: 640px) 88vw, 42rem"
                className="
                  h-auto
                  max-h-[calc(100dvh-3rem)]
                  w-auto
                  max-w-full
                  object-contain
                  transition-transform
                  duration-500
                  hover:scale-[1.02]
                "
              />
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                changeLightboxPage(1);
              }}
              aria-label="Next preview"
              className="
                absolute right-3 top-1/2
                hidden h-12 w-12
                -translate-y-1/2
                items-center justify-center
                rounded-full
                bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10
                text-white
                hover:bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/20
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                sm:flex
              "
            >
              <ChevronRight />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}