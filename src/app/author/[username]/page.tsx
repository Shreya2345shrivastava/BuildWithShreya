import { getPublicProfile } from "@/lib/actions/settings.actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function AuthorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const profile = await getPublicProfile(resolvedParams.username);
  
  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-ivory)] py-20 relative overflow-hidden font-sans">
      {/* Background soft blurs for premium watercolor feel */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-bg-sage-tint)] to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--color-bg-peach-tint)] rounded-full blur-[120px] opacity-40 -z-10" />
      <div className="absolute top-[30%] -left-20 w-[400px] h-[400px] bg-[var(--color-bg-sage-tint)] rounded-full blur-[100px] opacity-40 -z-10" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-6 mb-20 bg-[var(--color-surface-elevated)]/40 backdrop-blur-md p-10 md:p-16 rounded-[40px] border border-[var(--color-border-subtle)]/60 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-bg-peach-tint)] to-[var(--color-bg-sage-tint)] rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            {profile.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={profile.image} 
                alt={profile.name} 
                className="relative h-40 w-40 rounded-full border-4 border-[var(--color-surface-elevated)] object-cover shadow-xl"
              />
            ) : (
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-[var(--color-surface-elevated)] bg-gradient-to-br from-[var(--color-bg-ivory)] to-[var(--color-bg-peach-tint)] text-6xl font-medium text-[var(--color-botanical-leaf)] shadow-xl">
                {profile.name?.charAt(0).toUpperCase() || "A"}
              </div>
            )}
          </div>
          
          <div className="max-w-2xl mt-6">
            <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-text-primary)] font-bold mb-2 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-xl text-[var(--color-botanical-leaf)] font-light tracking-wide mb-6">
              @{profile.username}
            </p>
            
            {profile.bio && (
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] font-light">
                {profile.bio}
              </p>
            )}

            <div className="flex justify-center gap-4 mt-8">
               <button className="px-6 py-2.5 rounded-full bg-[var(--color-botanical-moss)] text-[var(--color-text-inverse)] hover:bg-[var(--color-text-primary)] transition-all duration-300 text-sm font-medium shadow-md">
                 Follow
               </button>
               <button className="px-6 py-2.5 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] transition-all duration-300 text-sm font-medium shadow-sm">
                 Message
               </button>
            </div>
          </div>
        </div>

        {/* Content Tabs / Sections */}
        <div className="grid gap-16 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="flex items-center justify-between border-b border-[var(--color-border-soft)] pb-4 mb-8">
                <h2 className="font-serif text-3xl font-semibold text-[var(--color-text-primary)]">
                  Featured Works
                </h2>
              </div>
              
              <div className="grid gap-8 sm:grid-cols-2">
                {/* Book Card */}
                <div className="group rounded-3xl border border-[var(--color-border-subtle)]/60 bg-[var(--color-surface-elevated)]/60 backdrop-blur-sm p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
                  <div className="relative aspect-[3/4] w-full rounded-2xl bg-gradient-to-br from-[var(--color-bg-ivory)] to-[var(--color-bg-sage-tint)] mb-6 overflow-hidden flex items-center justify-center shadow-inner">
                     <span className="text-5xl group-hover:scale-110 transition-transform duration-500 ease-out">📖</span>
                     <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="px-2 pb-2">
                    <span className="text-xs font-bold tracking-wider text-[var(--color-botanical-leaf)] uppercase mb-2 block">Best Seller</span>
                    <h3 className="font-serif text-2xl font-bold text-[var(--color-text-primary)] leading-tight mb-2">First Build It, Then Make It Beautiful</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">A gentle guide for dreamers, creators, and anyone waiting for the "right time."</p>
                    <Link href="/checkout" className="inline-flex items-center text-[var(--color-text-primary)] font-medium hover:text-[var(--color-botanical-leaf)] transition-colors">
                      Get the Book <span className="ml-1">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between border-b border-[var(--color-border-soft)] pb-4 mb-8">
                <h2 className="font-serif text-3xl font-semibold text-[var(--color-text-primary)]">
                  Latest Writings
                </h2>
              </div>
              
              <div className="space-y-4">
                 <Link href="#" className="block rounded-2xl border border-[var(--color-border-subtle)]/60 bg-[var(--color-surface-elevated)]/50 backdrop-blur-sm p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] group">
                   <div className="flex justify-between items-start mb-3">
                     <span className="text-xs font-medium text-[var(--color-botanical-leaf)] bg-[var(--color-bg-sage-tint)] px-3 py-1 rounded-full">Mindset</span>
                     <span className="text-xs text-[var(--color-text-muted)]">August 12, 2026</span>
                   </div>
                   <h3 className="font-serif text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-botanical-leaf)] transition-colors mb-2">Perfection is the Enemy of Progress</h3>
                   <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-4">Why we hold ourselves back waiting for the perfect moment, and how to break free from the cycle of overthinking.</p>
                   <div className="flex items-center text-sm font-medium text-[var(--color-text-primary)]">
                      Read essay
                      <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                   </div>
                 </Link>
              </div>
            </section>
          </div>

          <div className="space-y-8">
             <div className="rounded-3xl border border-[var(--color-border-subtle)]/60 bg-[var(--color-surface-elevated)]/50 backdrop-blur-sm p-8 shadow-sm">
               <h3 className="font-serif text-xl font-semibold text-[var(--color-text-primary)] mb-6">About {profile.name.split(" ")[0]}</h3>
               <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-6 text-sm">
                 Creator, writer, and builder. Passionate about helping others overcome fear and start creating meaningful work.
               </p>
               <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                 <div className="flex items-center gap-3">
                   <svg className="w-5 h-5 text-[var(--color-botanical-leaf)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                   India
                 </div>
                 <div className="flex items-center gap-3">
                   <svg className="w-5 h-5 text-[var(--color-botanical-leaf)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                   <a href="#" className="hover:text-[var(--color-text-primary)] underline decoration-transparent hover:decoration-[var(--color-botanical-leaf)] transition-colors">buildwithshreya.com</a>
                 </div>
               </div>
             </div>

             <div className="rounded-3xl border border-[var(--color-border-subtle)]/60 bg-[var(--color-surface-secondary)] p-8 shadow-md text-center">
               <h3 className="font-serif text-xl font-semibold mb-3 text-[var(--color-text-primary)]">Join the Newsletter</h3>
               <p className="text-sm text-[var(--color-text-secondary)] font-light mb-6">Get weekly insights on building and creating.</p>
               <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-sage)] mb-3" />
               <button className="w-full py-3 bg-[var(--color-botanical-moss)] text-[var(--color-text-inverse)] font-medium rounded-xl hover:bg-[var(--color-text-primary)] transition-colors shadow-sm">Subscribe</button>
             </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
