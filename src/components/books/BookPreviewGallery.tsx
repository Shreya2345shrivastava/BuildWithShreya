import Image from "next/image";

type BookPreviewGalleryProps = {
  pages: string[];
};

export function BookPreviewGallery({
  pages,
}: BookPreviewGalleryProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium tracking-[0.25em] text-[var(--color-accent-peach)]">
            PREVIEW
          </span>

          <h2 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)]">
            Look Inside The Book
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Explore a few sample pages before purchasing.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page, index) => (
            <div
              key={page}
              className="
                group
                overflow-hidden
                rounded-[2rem]
                border
                border-[var(--color-border-soft)]
                bg-white
                shadow-[0_15px_40px_rgba(32,25,19,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(32,25,19,0.12)]
              "
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={page}
                  alt={`Preview page ${index + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="border-t border-[var(--color-border-soft)] p-4 text-center">
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Page {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}