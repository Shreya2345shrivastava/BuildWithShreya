import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Features } from "@/components/sections/Features";
import { BookAnatomy } from "@/components/sections/BookAnatomy";
import BookShowcase from "@/components/sections/BookShowcase";
import { PreviewGallery } from "@/components/preview";
import { AuthorSection } from "@/components/sections/AuthorSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-primary)]">
        <Hero />
        <TrustBar />
        <BookShowcase />
        <Features />
        <BookAnatomy />
        <PreviewGallery />
        <AuthorSection />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}