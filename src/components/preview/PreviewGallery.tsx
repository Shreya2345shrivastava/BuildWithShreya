import Image from "next/image";
import { Container } from "@/components/ui";

const previewPages = [
  { title: "Personal Note", subtitle: "From Shreya", src: "/images/previews/all/page-3.png" },
  { title: "Table of Contents", subtitle: "Overview", src: "/images/previews/all/page-4.png" },
  { title: "Introduction", subtitle: "Getting Started", src: "/images/previews/all/page-5.png" },
  { title: "Chapter 1", subtitle: "Complete", src: "/images/previews/all/page-6.png" },
  { title: "Reflection Page", subtitle: "Workbook", src: "/images/previews/all/page-27.png" },
];

export function PreviewGallery() {
  return (
    <section aria-labelledby="preview-gallery-title" className="border-t border-black/[0.04] bg-white py-20 sm:py-28 lg:py-32">
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <h2 id="preview-gallery-title" className="font-serif text-3xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            A Peek Inside
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-[var(--color-accent-peach)]/60">
            <div className="mr-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
            <span className="h-1 w-1 rounded-full bg-current"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
            <span className="h-1 w-1 rounded-full bg-current"></span>
            <div className="ml-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {previewPages.map((page, index) => (
            <div key={index} className="group relative flex flex-col items-center">
              <div className="relative w-full overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[#FCF8F2] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[3/4] w-full">
                  <Image 
                    src={page.src} 
                    alt={page.title} 
                    fill 
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 p-4 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-center font-serif text-lg font-medium text-[var(--color-text-primary)]">{page.title}</span>
                    <span className="mt-1 text-center text-xs tracking-widest text-[#8A837D] uppercase">{page.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}