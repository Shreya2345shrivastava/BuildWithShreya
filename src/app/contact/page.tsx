import type { Metadata } from "next";

import {
  ContactHero,
  ContactMethods,
  ContactForm,
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
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <ContactFAQ />
      <ContactCTA />
    </main>
  );
}