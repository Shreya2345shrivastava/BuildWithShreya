import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import BookShowcase from "@/components/sections/BookShowcase";
import { PreviewGallery } from "@/components/preview";
import { AuthorSection } from "@/components/sections/AuthorSection";
import { Newsletter } from "@/components/Newsletter/Newsletter";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[var(--color-bg-ivory)] text-[var(--color-text-primary)]">
        <Hero />
        <Features />
        <BookShowcase />
        <PreviewGallery />
        <AuthorSection />
        <Newsletter />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}