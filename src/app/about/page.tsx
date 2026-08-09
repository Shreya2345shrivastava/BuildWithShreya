import type { Metadata } from "next";

import {
  AboutHero,
  AboutMission,
  AboutStory,
  AboutValues,
  AboutStats,
  AboutCTA,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About | BuildWithShreya",
  description:
    "Learn more about BuildWithShreya and the mission behind the platform.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutMission />
      <AboutStory />
      <AboutValues />
      <AboutStats />
      <AboutCTA />
    </main>
  );
}