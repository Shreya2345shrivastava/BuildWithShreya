"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, NotebookPen, Sparkles } from "lucide-react";

import { BookInfo, BookMockup, BookStats } from "@/components/books";
import { cn } from "@/lib/utils";

export default function BookShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="book-showcase-title"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_78%_34%,rgba(217,164,143,0.18),transparent_22%),radial-gradient(circle_at_14%_12%,rgba(255,250,244,0.95),transparent_28%),linear-gradient(180deg,#f7f2ec_0%,#f8f4ee_100%)] py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-[-8rem] top-1/3 h-72 w-72 rounded-full bg-[rgba(217,164,143,0.1)] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-5rem] top-20 hidden h-64 w-64 rounded-full border border-[rgba(217,164,143,0.2)] lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div
          className={cn(
            "grid w-full min-w-0 grid-cols-1 items-center gap-12 transition-all duration-700 ease-out lg:grid-cols-2 lg:gap-20 xl:gap-24",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <div className="order-2 w-full min-w-0 max-w-[600px] lg:order-1 lg:shrink-0">
            <BookInfo visible={visible} />

            <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <BookStats value="35" label="Pages" icon={BookOpen} />
              <BookStats value="Reflection" label="Prompts" icon={NotebookPen} />
              <BookStats value="Challenge" label="Exercises" icon={Sparkles} />
            </div>
          </div>

          <div className="order-1 flex w-full min-w-0 justify-center lg:order-2 lg:justify-end">
            <BookMockup visible={visible} />
          </div>
        </div>
      </div>
    </section>
  );
}
