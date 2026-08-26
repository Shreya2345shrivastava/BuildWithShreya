import { VideoTestimonialCard } from "./VideoTestimonialCard";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Aspiring Author",
    review: "I was paralyzed by perfectionism for years. This book gave me the permission to start messy and the exact system I needed to finally finish my first manuscript.",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/11/38600-418751515_tiny.mp4",
    posterUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    heightClass: "h-[450px]"
  },
  {
    name: "Aman Verma",
    role: "Digital Creator",
    review: "Beautifully designed and incredibly practical. Every page feels intentional. I went from endlessly consuming content to actually launching my first digital product in just 30 days.",
    videoUrl: "https://cdn.pixabay.com/video/2021/08/04/83896-584777592_tiny.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    heightClass: "h-[380px]"
  },
  {
    name: "Neha Gupta",
    role: "Designer & Illustrator",
    review: "One of the most inspiring workbooks I've ever held. The aesthetic alone makes me want to sit down and do deep work, but the frameworks are what actually kept me going.",
    videoUrl: "https://cdn.pixabay.com/video/2023/10/22/186006-876807865_tiny.mp4",
    posterUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
    heightClass: "h-[500px]"
  },
  {
    name: "Rahul Mehta",
    role: "Newsletter Writer",
    review: "I was overwhelmed by all the 'hustle culture' advice out there. This book offered a gentle, sustainable path. It completely rewired how I approach my creative business.",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/11/38598-418751433_tiny.mp4",
    posterUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    heightClass: "h-[400px]"
  },
  {
    name: "Sarah Chen",
    role: "Creative Entrepreneur",
    review: "Finally, a guide that balances beautiful aesthetics with hardcore execution. Reading this felt like having a warm, yet highly strategic mentor in my living room.",
    videoUrl: "https://cdn.pixabay.com/video/2021/08/04/83895-584777553_tiny.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    heightClass: "h-[480px]"
  },
  {
    name: "David Kumar",
    role: "Freelance Photographer",
    review: "This isn't just a book, it's a lifeline for creatives who feel stuck. The reflection prompts alone are worth 10x the price of the book.",
    videoUrl: "https://cdn.pixabay.com/video/2023/04/18/159495-819196562_tiny.mp4",
    posterUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    heightClass: "h-[350px]"
  }
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-10 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-[clamp(2rem,6vw,3.75rem)] font-medium tracking-tight text-[var(--color-text-primary)]">
            Loved by Readers
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Don't just take our word for it. Hear from the creators, dreamers, and doers who are already building beautiful things.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-[var(--color-accent-peach)]/60">
            <div className="mr-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
            <span className="h-1 w-1 rounded-full bg-current"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
            <span className="h-1 w-1 rounded-full bg-current"></span>
            <div className="ml-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
          </div>
        </div>

        {/* Masonry Grid with advanced CSS :has() hover dimming */}
        <div className="group columns-1 sm:columns-2 lg:columns-3 gap-6 w-full mx-auto space-y-6 [&:has(.video-card:hover)_.video-card:not(:hover)]:opacity-30 [&:has(.video-card:hover)_.video-card:not(:hover)]:scale-[0.98] [&:has(.video-card:hover)_.video-card:not(:hover)]:grayscale-[50%] transition-all duration-700">
          {testimonials.map((item) => (
            <VideoTestimonialCard
              key={item.name}
              name={item.name}
              role={item.role}
              review={item.review}
              videoUrl={item.videoUrl}
              posterUrl={item.posterUrl}
              heightClass={item.heightClass}
            />
          ))}
        </div>

      </div>
    </section>
  );
}