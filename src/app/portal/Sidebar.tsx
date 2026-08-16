"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  Home, 
  BookOpen, 
  Target, 
  Download,
  LogOut,
  ChevronRight
} from "lucide-react";
import { signOut } from "next-auth/react";

const navLinks = [
  { label: "Overview", href: "/portal", icon: Home },
  { label: "Read Online", href: "/portal/read", icon: BookOpen },
  { label: "30-Day Challenge", href: "/portal/challenge", icon: Target },
  { label: "Downloads", href: "/portal/downloads", icon: Download },
];

export function Sidebar({ profile }: { profile: any }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[104px] w-[280px] shrink-0 border-r border-black/[0.04] bg-[var(--color-bg-ivory)] p-6 min-h-[calc(100vh-104px)] flex flex-col">
      <div className="mb-10 flex items-center gap-4">
        {profile?.image ? (
          <Image
            src={profile.image}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full border border-black/10"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8DED5] text-lg font-serif text-[var(--color-text-primary)]">
            {profile?.name?.[0] || profile?.email?.[0] || "U"}
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-serif text-lg font-medium text-[var(--color-text-primary)]">
            {profile?.name || "Reader"}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">Exclusive Member</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = 
            link.href === "/portal" 
              ? pathname === "/portal" 
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[var(--color-surface-elevated)] text-[var(--color-accent-peach)] shadow-sm ring-1 ring-black/[0.04]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]/60 hover:text-[var(--color-text-primary)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                {link.label}
              </div>
              {isActive && (
                <ChevronRight size={16} className="text-[var(--color-accent-peach)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 border-t border-black/[0.04] pt-6">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)]/60 hover:text-[var(--color-text-primary)]"
        >
          <LogOut size={18} strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
