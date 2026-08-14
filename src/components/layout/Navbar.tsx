"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/ui";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Logo } from "@/components/layout/Logo";
import { NavLinks } from "@/components/layout/NavLinks";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { UserMenu } from "@/components/auth";
import { cn } from "@/lib/utils";

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function Navbar({ profile }: { profile?: { name?: string; image?: string; username?: string; email?: string } }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 20);
    };

    updateScrolled();

    window.addEventListener("scroll", updateScrolled, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4">
      <Container width="wide" noPadding>
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between rounded-full border transition-all duration-500",
            "px-6 py-4 lg:px-8",
            scrolled
              ? "border-[#E7DDD4] bg-[rgba(255,251,247,0.95)] backdrop-blur-2xl shadow-[0_20px_60px_rgba(30,25,20,0.10)]"
              : "border-[#EEE5DD] bg-[rgba(255,251,247,0.78)] backdrop-blur-xl shadow-[0_10px_35px_rgba(30,25,20,0.05)]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center"
            aria-label="BuildWithShreya Home"
          >
            <Logo className="transition duration-300 group-hover:scale-[1.02]" />
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex">
            <NavLinks />
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="rounded-full border border-[#ECE2D8] bg-white/70 px-2 py-1 backdrop-blur-sm">
              <UserMenu profile={profile} />
            </div>

            {/* CTA */}
            <PrimaryButton
              href="/books/first-build-it-then-make-it-beautiful"
              size="md"
              rounded={false}
              className="
                rounded-full
                px-7
                py-2.5
                text-[0.95rem]
                font-medium
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              Get the Book
            </PrimaryButton>
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
            className="
              lg:hidden
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#E8DED5]
              bg-white/90
              backdrop-blur-sm
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
            "
          >
            <MenuIcon />
          </button>
        </nav>
      </Container>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}