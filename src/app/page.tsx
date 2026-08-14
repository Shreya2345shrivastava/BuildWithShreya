import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Features } from "@/components/sections/Features";
import BookShowcase from "@/components/sections/BookShowcase";
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
        <BookShowcase />
        <PreviewGallery />
        <AuthorSection />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}