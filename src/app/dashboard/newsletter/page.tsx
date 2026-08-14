import { getDashboardMetrics, getCampaigns, getSubscribers } from "@/lib/actions/newsletter.actions";
import NewsletterClient from "./NewsletterClient";
import { Suspense } from "react";

export default async function NewsletterPage() {
  const metrics = await getDashboardMetrics();
  const campaigns = await getCampaigns();
  const subscribers = await getSubscribers();

  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center text-[#8A837D]">Loading newsletter data...</div>}>
      <NewsletterClient 
        metrics={metrics}
        initialCampaigns={campaigns}
        initialSubscribers={subscribers}
      />
    </Suspense>
  );
}