import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Features } from "@/components/sections/Features";
import { BookAnatomy } from "@/components/sections/BookAnatomy";
import { PreviewGallery } from "@/components/preview";
import { AuthorSection } from "@/components/sections/AuthorSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-[var(--color-bg-ivory)] text-[var(--color-text-primary)]">
        <Hero />
        <TrustBar />
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