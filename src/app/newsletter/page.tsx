import type { Metadata } from "next";

import {
  NewsletterHero,
  NewsletterBenefits,
  NewsletterPreview,
  NewsletterSignup,
} from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Newsletter | BuildWithShreya",
  description:
    "Join the BuildWithShreya newsletter and receive practical insights, growth strategies and curated resources.",
};

export default function NewsletterPage() {
  return (
    <main>
      <NewsletterHero />

      <NewsletterBenefits />

      <NewsletterPreview />

      <NewsletterSignup />
    </main>
  );
}