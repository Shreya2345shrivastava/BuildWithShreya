import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SITE } from "@/constants/site";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: SITE.title,
    template: `%s | BuildWithShreya`,
  },

  description: SITE.description,

  keywords: [
    "BuildWithShreya",
    "Workbook",
    "Productivity",
    "Self Improvement",
    "Goal Setting",
    "Creators",
    "Students",
    "Personal Growth",
    "Digital Book",
    "Planning Workbook",
  ],

  authors: [
    {
      name: "Shreya",
    },
  ],

  creator: "Shreya",

  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: "BuildWithShreya",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "BuildWithShreya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/og-cover.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg-ivory)] text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}