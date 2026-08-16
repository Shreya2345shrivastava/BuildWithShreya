import { getResources } from "@/lib/actions/resources.actions";
import ResourceClient from "./ResourceClient";
import { Suspense } from "react";

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query, category } = await searchParams;
  
  const resources = await getResources(query || "", category || "All Categories");

  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center text-[var(--color-text-secondary)]">Loading resources...</div>}>
      <ResourceClient initialResources={resources} />
    </Suspense>
  );
}
