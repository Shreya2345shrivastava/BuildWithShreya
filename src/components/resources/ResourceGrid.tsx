import { resources } from "@/data/resources";
import { ResourceCard } from "./ResourceCard";

export function ResourceGrid() {
  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Grid flows directly from the cinematic hero */}

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