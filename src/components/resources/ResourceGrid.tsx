import { resources } from "@/data/resources";
import { ResourceCard } from "./ResourceCard";

export function ResourceGrid() {
  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-[0.2em] text-[var(--color-accent-peach)]">
            COLLECTION
          </span>

          <h2 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)]">
            Explore Resources
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Practical digital tools designed to help you grow,
            stay organized and take action.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.slug}
              slug={resource.slug}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              price={resource.price}
              featured={resource.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}