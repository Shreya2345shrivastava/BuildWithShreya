export function AboutMission() {
  return (
    <section className="py-32 bg-[#FCF8F2] relative overflow-hidden">
      <div className="absolute -left-32 top-32 h-[500px] w-[500px] rounded-full bg-[var(--color-accent-peach)]/5 blur-[80px]" />
      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <h2 className="font-serif text-4xl sm:text-6xl text-[var(--color-text-primary)]">
          Our <span className="italic text-[#778668]">Mission</span>
        </h2>

        <p className="mx-auto mt-12 text-2xl sm:text-3xl leading-relaxed text-[var(--color-text-secondary)] font-serif font-light text-balance">
          To make personal growth <span className="text-[var(--color-accent-peach)] font-medium">simple</span>, <span className="text-[var(--color-accent-peach)] font-medium">practical</span> and
          <span className="text-[var(--color-accent-peach)] font-medium"> accessible</span> through thoughtfully designed digital
          products and educational content.
        </p>
      </div>
    </section>
  );
}