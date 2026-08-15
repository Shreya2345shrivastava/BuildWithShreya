import { Mail, AtSign, Send } from "lucide-react";

const methods = [
  {
    title: "Email",
    value: "hello@buildwithshreya.com",
    href: "mailto:hello@buildwithshreya.com",
    icon: <Mail size={24} />,
  },
  {
    title: "Instagram",
    value: "@buildwithshreya",
    href: "https://instagram.com/buildwithshreya",
    icon: <AtSign size={24} />,
  },
  {
    title: "Newsletter",
    value: "Weekly growth insights",
    href: "/newsletter",
    icon: <Send size={24} />,
  },
];

export function ContactMethods() {
  return (
    <section className="py-24 bg-[var(--color-bg-ivory)] dark:bg-[#0F1211] transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col border-t border-black/10 dark:border-white/10">
          {methods.map((method, idx) => (
            <a
              key={method.title}
              href={method.href}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 dark:border-white/10 py-10 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] overflow-hidden"
            >
              {/* Left Side: Number & Title */}
              <div className="flex items-center gap-6 sm:gap-12 relative z-10">
                <span className="text-sm font-medium tracking-widest text-black/40 dark:text-white/40 group-hover:text-[var(--color-accent-peach)] transition-colors">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)] dark:text-white transition-transform duration-500 ease-out group-hover:translate-x-4">
                  {method.title}
                </h3>
              </div>

              {/* Right Side: Value & Icon */}
              <div className="flex items-center gap-6 mt-6 sm:mt-0 relative z-10 sm:ml-auto">
                <p className="text-lg text-[var(--color-text-secondary)] dark:text-white/60 opacity-100 sm:opacity-0 sm:-translate-x-4 transition-all duration-500 ease-out sm:group-hover:opacity-100 sm:group-hover:translate-x-0">
                  {method.value}
                </p>
                <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-[var(--color-text-primary)] dark:text-white transition-all duration-500 ease-out group-hover:bg-[var(--color-accent-peach)] group-hover:border-[var(--color-accent-peach)] group-hover:text-white group-hover:scale-110">
                  {method.icon}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}