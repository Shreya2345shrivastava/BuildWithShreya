import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Free Sample - BuildWithShreya',
  description: 'Preview a free sample of our featured book',
};

export default function SamplePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-ivory)] py-12 lg:py-20 relative overflow-hidden font-sans text-[var(--color-text-primary)]">
      {/* Background soft blurs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-bg-sage-tint)] to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--color-bg-peach-tint)] rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute top-[30%] -left-20 w-[400px] h-[400px] bg-[var(--color-bg-sage-tint)] rounded-full blur-[100px] opacity-40 -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors group">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] font-bold mb-4 tracking-tight">
            Read a Free Sample
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Take a sneak peek into <span className="italic">First Build It, Then Make It Beautiful</span> and discover how to overcome the fear of starting.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar / Info */}
          <div className="w-full lg:w-1/3 bg-[var(--color-surface-elevated)]/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#e8efe9] to-[#cbe3d3] rounded-xl mb-6 shadow-inner relative overflow-hidden group">
               {/* Book Cover Placeholder */}
               <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                 <div className="w-16 h-16 bg-[var(--color-surface-elevated)]/40 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📖</span>
                 </div>
                 <h3 className="font-serif text-xl font-semibold text-[#2d3a2f]">First Build It, Then Make It Beautiful</h3>
                 <p className="text-sm text-[#5a6b5d] mt-2">Sample Edition</p>
               </div>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-[#1a1f1b] mb-4">What's included in this sample:</h2>
            <ul className="space-y-3 mb-8">
              {['Introduction', 'Chapter 1: Why This Book Exists', 'Chapter 2: The Dream vs The Fear', 'Chapter 3: Perfection Is the Enemy'].map((item, i) => (
                <li key={i} className="flex items-start text-[var(--color-text-secondary)]">
                  <svg className="w-5 h-5 mr-3 text-[var(--color-accent-sage)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center justify-center space-y-4">
              <p className="text-[var(--color-text-secondary)] font-medium">Ready to read the rest?</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <a href="/First Build It, Then Make It Beautiful - Free Sample.pdf" download className="w-full py-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] rounded-xl font-medium transition-all duration-300 shadow-sm flex justify-center items-center group">
                  <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF Sample
                </a>
              </div>
              <Link href="/checkout" className="block w-full py-4 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border-soft)] rounded-xl font-medium text-center transition-all duration-300 shadow-sm">
                Buy Full Version
              </Link>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full lg:w-2/3 bg-[var(--color-surface-elevated)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden flex flex-col h-[800px]">
            <iframe 
              src="/sample.pdf#toolbar=0" 
              className="w-full h-full border-none"
              title="Book Sample PDF"
            />
          </div>
          
        </div>
      </div>
    </main>
  );
}

