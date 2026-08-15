import type { Metadata } from "next";

import {
  ContactSplitSection,
  ContactFAQ,
  ContactCTA,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact | BuildWithShreya",
  description:
    "Get in touch with BuildWithShreya.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSplitSection />
      <ContactFAQ />
      <ContactCTA />
    </main>
  );
}