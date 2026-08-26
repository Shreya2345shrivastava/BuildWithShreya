import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { SITE } from "@/constants/site";

export const metadata = {
  title: `Page Not Found | ${SITE.title}`,
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] min-h-screen flex items-center justify-center py-32 transition-colors duration-300 relative overflow-hidden">
      {/* Immersive Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/5 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-accent-sage)]/20 dark:bg-[#2A332D]/40 blur-[150px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Container className="relative z-10 text-center flex flex-col items-center">
        <h1 className="font-serif text-8xl md:text-9xl text-[var(--color-accent-peach)] mb-6 opacity-80">
          404
        </h1>
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] mb-6">
          Lost in the margins.
        </h2>
        <p className="max-w-md mx-auto text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
          The page you're looking for seems to have wandered off. Let's get you back to the main story.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-wide !text-black dark:!text-black bg-[var(--color-accent-peach)] px-8 py-4 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          Return Home
        </Link>
      </Container>
    </main>
  );
}
