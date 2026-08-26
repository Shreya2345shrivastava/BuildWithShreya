import React from 'react';
import Link from 'next/link';
import { BackButton } from "@/components/ui/BackButton";

export const metadata = {
  title: 'Free Sample - BuildWithShreya',
  description: 'Preview a free sample of our featured book',
};

export default function SamplePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-ivory)] pt-32 pb-12 lg:pt-40 lg:pb-20 relative overflow-hidden font-sans text-[var(--color-text-primary)]">
      {/* Background soft blurs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-bg-sage-tint)] to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--color-bg-peach-tint)] rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute top-[30%] -left-20 w-[400px] h-[400px] bg-[var(--color-bg-sage-tint)] rounded-full blur-[100px] opacity-40 -z-10" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <BackButton href="/books/first-build-it-then-make-it-beautiful" label="Back to Book" />
          </div>
          <div className="lg:hidden mb-6 flex justify-center">
            <BackButton href="/books/first-build-it-then-make-it-beautiful" label="Back to Book" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] font-bold mb-4 tracking-tight">
            Read a Free Sample
          </h1>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Take a sneak peek into <span className="italic">First Build It, Then Make It Beautiful</span> and discover how to overcome the fear of starting.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* Sidebar / Info */}
          <div className="w-full lg:w-[320px] shrink-0 bg-[var(--color-surface-elevated)]/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            
            {/* Sleek Book Info Card */}
            <div className="bg-gradient-to-r from-[var(--color-bg-sage-tint)] to-[var(--color-bg-peach-tint)] rounded-xl mb-8 p-5 flex items-center gap-4 shadow-sm border border-black/5 dark:border-white/5">
               <div className="w-12 h-12 bg-white/50 dark:bg-black/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                  <span className="text-2xl">📖</span>
               </div>
               <div>
                 <h3 className="font-serif text-sm font-semibold text-[var(--color-text-primary)] leading-tight">First Build It, Then Make It Beautiful</h3>
                 <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium tracking-wide uppercase">Sample Edition</p>
               </div>
            </div>
            
            <h2 className="text-sm uppercase tracking-widest font-semibold text-[var(--color-text-secondary)] mb-4">What's included:</h2>
            <ul className="space-y-3 mb-8 text-sm md:text-base">
              {['Introduction', 'Chapter 1: Why This Book Exists', 'Chapter 2: The Dream vs The Fear', 'Chapter 3: Perfection Is the Enemy'].map((item, i) => (
                <li key={i} className="flex items-start text-[var(--color-text-secondary)] group">
                  <svg className="w-4 h-4 mr-3 text-[var(--color-accent-sage)] flex-shrink-0 mt-1 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[var(--color-border-soft)] dark:border-white/10 flex flex-col space-y-4">
              <a href="/First Build It, Then Make It Beautiful - Free Sample.pdf" download className="w-full py-3 px-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] rounded-xl text-sm font-medium transition-all duration-300 shadow-sm flex justify-center items-center group">
                <svg className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
              <Link href="/checkout" className="block w-full py-3 px-4 bg-[var(--color-accent-peach)] hover:opacity-90 text-[#131715] rounded-xl text-sm font-bold text-center transition-all duration-300 shadow-sm">
                Buy Full Version
              </Link>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full flex-1 bg-[var(--color-surface-elevated)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-[var(--color-border-soft)] dark:border-white/10 overflow-hidden flex flex-col h-[500px] sm:h-[600px] lg:h-[700px]">
            {/* Elegant Top Bar for PDF */}
            <div className="h-12 bg-black/5 dark:bg-white/5 border-b border-[var(--color-border-soft)] dark:border-white/10 flex items-center px-4 justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">Preview Mode</span>
            </div>
            {/* Iframe */}
            <div className="flex-1 w-full relative bg-[#f1f5f9] dark:bg-[#1a1f1b]">
              <iframe 
                src="/sample.pdf#toolbar=0&view=FitH" 
                className="absolute inset-0 w-full h-full border-none"
                title="Book Sample PDF"
              />
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}

