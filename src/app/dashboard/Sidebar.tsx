"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";
import {
  LayoutDashboard,
  PlusCircle,
  Book,
  Gift,
  PenTool,
  Mail,
  Settings,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <LayoutDashboard size={18} strokeWidth={1.5} />,
  },
  {
    href: "/dashboard/books",
    label: "Add Book",
    icon: <PlusCircle size={18} strokeWidth={1.5} />,
  },
  {
    href: "/dashboard/books/manage",
    label: "Manage Books",
    icon: <Book size={18} strokeWidth={1.5} />,
  },
  {
    href: "/dashboard/resources",
    label: "Resources",
    icon: <Gift size={18} strokeWidth={1.5} />,
  },
  {
    href: "/dashboard/blogs",
    label: "Blogs",
    icon: <PenTool size={18} strokeWidth={1.5} />,
  },
  {
    href: "/dashboard/newsletter",
    label: "Newsletter",
    icon: <Mail size={18} strokeWidth={1.5} />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <Settings size={18} strokeWidth={1.5} />,
  },
];

export function Sidebar({ profile }: { profile?: { name?: string; image?: string; username?: string; email?: string } }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-[104px] flex h-[calc(100vh-104px)] w-72 flex-col border-r border-black/[0.04] dark:border-white/5 bg-transparent pb-8 pl-8 pr-6 pt-12">
      {/* Scrollable Area */}
      <div className="no-scrollbar flex-1 overflow-y-auto">
        
        {/* Navigation */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors duration-200 ${
                  isActive
                    ? "bg-black/5 dark:bg-white/10 font-medium text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-black/[0.02] dark:hover:bg-white/[0.05] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <span
                  className={`transition-colors ${
                    isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.icon}
                </span>

                <span className="text-[0.95rem]">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Area */}
      <div className="mt-8 shrink-0 space-y-4 border-t border-black/[0.04] dark:border-white/5 pt-6">
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#ECE2D8] dark:border-white/10 bg-[#FBF8F5] dark:bg-white/5 text-sm font-medium text-[var(--color-text-primary)] shadow-sm">
            {profile?.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={profile.image} alt={profile?.name || "User"} className="h-full w-full object-cover" />
            ) : (
              (profile?.name?.charAt(0) || "U").toUpperCase()
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">{profile?.name || "Admin"}</span>
            <span className="truncate text-xs text-[var(--color-text-secondary)]">@{profile?.username || "admin"}</span>
          </div>
        </div>
        <div className="px-3">
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
