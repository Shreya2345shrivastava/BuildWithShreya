import type { Metadata } from "next";

import {
  ResourceHero,
  ResourceGrid,
} from "@/components/resources";

export const metadata: Metadata = {
  title: "Resources | BuildWithShreya",
  description:
    "Trackers, planners, worksheets and digital tools to help you grow.",
};

export default function ResourcesPage() {
  return (
    <main>
      <ResourceHero />
      <ResourceGrid />
    </main>
  );
}