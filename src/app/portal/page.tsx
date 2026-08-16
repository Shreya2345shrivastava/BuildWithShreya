"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Target, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function ReaderDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Builder";

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-surface-elevated)] p-8 sm:p-12 shadow-sm border border-black/[0.04]">
        <div className="absolute -right-20 -top-20 opacity-30">
          <Image 
            src="/images/watercolors/botanical-2.png" 
            alt="" 
            width={400} 
            height={400} 
            className="object-contain"
          />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent-peach)] mb-2">
            Welcome to your portal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-4">
            Hello, {userName}. Let&apos;s build something beautiful.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            You now have full access to "First Build It, Then Make It Beautiful", the 30-day challenge, and all accompanying resources.
          </p>
          <PrimaryButton 
            href="/portal/read"
            size="md"
            rightIcon={<ArrowRight size={16} />}
            className="rounded-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            showIcon={false}
          >
            Start Reading
          </PrimaryButton>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Link 
          href="/portal/read"
          className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface-elevated)] p-8 border border-black/[0.04] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-[var(--color-bg-ivory)] opacity-50 transition-transform group-hover:scale-150" />
          <div className="relative z-10 flex flex-col items-start">
            <div className="mb-4 rounded-xl bg-[var(--color-bg-ivory)] p-3 text-[var(--color-accent-peach)]">
              <BookOpen size={24} strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 font-serif text-2xl text-[var(--color-text-primary)]">Read Online</h3>
            <p className="text-[var(--color-text-secondary)]">Dive straight into the book directly from your browser. No downloads required.</p>
          </div>
        </Link>

        <Link 
          href="/portal/challenge"
          className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface-elevated)] p-8 border border-black/[0.04] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-[var(--color-bg-ivory)] opacity-50 transition-transform group-hover:scale-150" />
          <div className="relative z-10 flex flex-col items-start">
            <div className="mb-4 rounded-xl bg-[var(--color-bg-ivory)] p-3 text-[var(--color-accent-peach)]">
              <Target size={24} strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 font-serif text-2xl text-[var(--color-text-primary)]">30-Day Challenge</h3>
            <p className="text-[var(--color-text-secondary)]">Track your daily progress and build unstoppable momentum towards your goals.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
