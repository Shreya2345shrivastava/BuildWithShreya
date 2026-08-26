import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SITE } from "@/constants/site";
import "./globals.css";
import AuthProvider from "@/components/auth/SessionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { BrandProvider } from "@/components/layout/BrandProvider";
import { getGlobalBrandSettings, getAuthUserProfileSafe } from "@/lib/actions/settings.actions";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getGlobalBrandSettings();
  const siteTitle = brand?.brandName || SITE.title;
  const siteDesc = brand?.brandDescription || SITE.description;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDesc,
    keywords: [
      siteTitle,
      "Workbook",
      "Productivity",
      "Self Improvement",
      "Goal Setting",
      "Creators",
      "Students",
      "Personal Growth",
    ],
    authors: [{ name: "Shreya" }],
    creator: "Shreya",
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      url: SITE.url,
      siteName: siteTitle,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/images/og-cover.jpg",
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDesc,
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
}

import { ThemeProvider } from "@/components/layout/ThemeProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getAuthUserProfileSafe();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg-ivory)] text-[var(--color-text-primary)] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <BrandProvider>
              <Navbar profile={profile} />
              {children}
            </BrandProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}