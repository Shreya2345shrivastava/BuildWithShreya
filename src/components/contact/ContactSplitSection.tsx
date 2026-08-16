import { Mail, AtSign, Send } from "lucide-react";
import Link from "next/link";

const methods = [
  {
    title: "Email",
    value: "hello@buildwithshreya.com",
    href: "mailto:hello@buildwithshreya.com",
    icon: <Mail size={24} className="text-[var(--color-accent-peach)]" />,
  },
  {
    title: "Instagram",
    value: "@buildwithshreya",
    href: "https://instagram.com/buildwithshreya",
    icon: <AtSign size={24} className="text-[var(--color-accent-peach)]" />,
  },
  {
    title: "Newsletter",
    value: "Weekly growth insights",
    href: "/newsletter",
    icon: <Send size={24} className="text-[var(--color-accent-peach)]" />,
  },
];

export function ContactSplitSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715] dark:bg-[#0F1211] min-h-[90vh] pt-32 pb-24 transition-colors duration-300">
      {/* Immersive Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/20 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-accent-sage)]/20 dark:bg-[#2A332D]/40 blur-[150px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Cinematic Story & Methods */}
          <div className="space-y-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-peach)]/30 bg-[var(--color-accent-peach)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)] backdrop-blur-md">
                Get In Touch
              </span>

              <h1 className="mt-8 font-serif text-5xl tracking-tight sm:text-7xl lg:text-8xl text-[var(--color-text-primary)] dark:text-white">
                Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-peach)] to-[#D9895B] dark:to-[#E8D4C8] italic">Connect</span>
              </h1>

              <p className="mt-8 text-lg sm:text-xl text-[var(--color-text-secondary)] dark:text-white/70 leading-relaxed max-w-lg">
                Whether you have a question, a collaboration idea, or just want to say hello—I'm all ears.
              </p>
            </div>

            <div className="space-y-4">
              {methods.map((method, idx) => (
                <Link
                  key={method.title}
                  href={method.href}
                  className="group flex items-center p-4 rounded-3xl border border-black/5 dark:border-white/10 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/40 dark:bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/5 backdrop-blur-md transition-all duration-300 hover:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] dark:hover:bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10 hover:-translate-y-1 hover:shadow-lg"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-surface-elevated)] dark:bg-[#242b28] dark:bg-black/50 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                    {method.icon}
                  </div>
                  <div className="ml-6">
                    <h3 className="font-serif text-2xl text-[var(--color-text-primary)] dark:text-white transition-colors group-hover:text-[var(--color-accent-peach)]">
                      {method.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] dark:text-white/60">
                      {method.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Glassmorphism Form */}
          <div className="relative">
            {/* Form Orb Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-accent-peach)]/20 dark:bg-[var(--color-accent-peach)]/30 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative rounded-[2.5rem] border border-white/20 dark:border-white/10 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/40 dark:bg-black/20 p-8 sm:p-12 shadow-2xl backdrop-blur-3xl ring-1 ring-black/5 dark:ring-white/10">
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-text-primary)] dark:text-white mb-8">
                Send a Message
              </h2>

              <form action="https://formspree.io/f/xkjwobve" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium tracking-wide text-[var(--color-text-secondary)] dark:text-white/60 pl-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/50 dark:bg-black/40 px-6 py-4 text-[var(--color-text-primary)] dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-[var(--color-accent-peach)] focus:ring-1 focus:ring-[var(--color-accent-peach)]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium tracking-wide text-[var(--color-text-secondary)] dark:text-white/60 pl-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/50 dark:bg-black/40 px-6 py-4 text-[var(--color-text-primary)] dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-[var(--color-accent-peach)] focus:ring-1 focus:ring-[var(--color-accent-peach)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium tracking-wide text-[var(--color-text-secondary)] dark:text-white/60 pl-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="How can I help you?"
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/50 dark:bg-black/40 px-6 py-4 text-[var(--color-text-primary)] dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-[var(--color-accent-peach)] focus:ring-1 focus:ring-[var(--color-accent-peach)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[var(--color-text-primary)] dark:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-8 py-5 font-semibold text-white dark:text-black transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
