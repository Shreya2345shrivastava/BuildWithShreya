export function ResourceHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      {/* Premium Background Accents */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#FCF8F2] to-transparent opacity-80" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#D9895B]/10 rounded-full blur-[100px] mix-blend-multiply" />
      
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="h-px w-8 bg-[#D9895B]/60" />
          <span className="text-sm font-bold tracking-[0.3em] text-[#D9895B] uppercase">
            Resource Library
          </span>
          <div className="h-px w-8 bg-[#D9895B]/60" />
        </div>

        <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[#3A332D] mb-8 tracking-tight leading-[1.05]">
          Tools Designed <br className="hidden sm:block" />
          <span className="italic text-[#D9895B]">For Real Growth.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#8A837D] font-light">
          Trackers, planners, worksheets, and digital resources meticulously crafted to help you stay focused, organized, and intentional.
        </p>
      </div>
    </section>
  );
}