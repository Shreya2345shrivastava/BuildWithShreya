import { SignInButton } from "@/components/auth/SignInButton";
import { BotanicalDecoration } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[var(--color-bg-ivory)] px-4 sm:px-6 overflow-hidden pt-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply">
        <BotanicalDecoration variant="watercolor-blob" className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] text-[#E0CDBF]" />
        <BotanicalDecoration variant="watercolor-blob" className="absolute top-[20%] -right-[20%] w-[1000px] h-[1000px] text-[#E8EDEB]" />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-0 bg-[var(--color-surface-elevated)]/70 backdrop-blur-2xl rounded-[2.5rem] border border-[var(--color-border-soft)] shadow-[0_20px_80px_rgba(32,25,19,0.08)] overflow-hidden my-12">
        
        {/* Left Side: Image/Branding */}
        <div className="relative hidden md:block w-full bg-[var(--color-bg-ivory)]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <Image 
            src="/mockups/hero_book.jpg" 
            alt="Build with Shreya Book" 
            fill 
            className="object-cover"
          />
          <div className="absolute top-8 left-8 z-20">
            <Link href="/">
              <span className="font-serif text-xl font-medium tracking-tight text-white drop-shadow-md hover:text-white/90 transition-colors cursor-pointer">
                BuildWithShreya
              </span>
            </Link>
          </div>
          <div className="absolute bottom-12 left-10 right-10 z-20">
            <h2 className="font-serif text-3xl font-medium mb-3 shadow-sm drop-shadow-md text-white">Unlock the Builder within.</h2>
            <p className="text-white/90 text-sm font-medium tracking-wide leading-relaxed drop-shadow-sm">Sign in to access your portal, exclusive resources, and the complete reading experience.</p>
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-14 md:py-24 text-center bg-[var(--color-surface-elevated)]/50 backdrop-blur-md">
          {/* Mobile Logo */}
          <div className="md:hidden mb-12 flex justify-center">
             <Link href="/">
               <span className="font-serif text-2xl font-medium tracking-tight text-[var(--color-text-primary)]">
                 BuildWithShreya
               </span>
             </Link>
          </div>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-bg-ivory)] shadow-sm border border-[var(--color-border-soft)] mb-8">
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent-peach)]"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          
          <h1 className="font-serif text-4xl text-[var(--color-text-primary)] mb-3">
            Welcome Back
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-10 text-sm">
            Sign in to your account to continue your journey.
          </p>

          <SignInButton />
          
          <div className="mt-10 flex items-center justify-center space-x-4">
            <div className="h-px w-full bg-[var(--color-border-soft)]"></div>
            <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-widest font-medium whitespace-nowrap">
              Secure Access
            </p>
            <div className="h-px w-full bg-[var(--color-border-soft)]"></div>
          </div>
        </div>

      </div>
    </main>
  );
}