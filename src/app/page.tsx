import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { CategoryShowcase } from "@/components/products/CategoryShowcase";
import { FeaturedCreations } from "@/components/sections/FeaturedCreations";
import { AuthorSection } from "@/components/sections/AuthorSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-primary)] overflow-x-hidden w-full">
        <Hero />
        <CategoryShowcase />
        <FeaturedCreations />
        <AuthorSection />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}