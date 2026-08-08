import { AboutAuthor } from "@/components/author/AboutAuthor";

export function AuthorSection() {
  return (
    <section
      id="author"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <AboutAuthor />
      </div>
    </section>
  );
}