"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  Book,
  Gift,
  PenTool,
  Mail,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
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
    href: "/dashboard/lifeos",
    label: "LifeOS",
    icon: <Sparkles size={18} strokeWidth={1.5} />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <Settings size={18} strokeWidth={1.5} />,
  },
];

export function Sidebar({ profile }: { profile?: { name?: string; image?: string; username?: string; email?: string } }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? 80 : 288,
        paddingLeft: isCollapsed ? 8 : 32,
        paddingRight: isCollapsed ? 8 : 24
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`sticky top-[104px] z-50 flex h-[calc(100vh-104px)] flex-col border-r border-black/[0.04] dark:border-white/5 bg-transparent pb-8 pt-12`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] shadow-sm transition-colors hover:text-[var(--color-text-primary)] z-10"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Scrollable Area */}
      <div className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
        {/* Navigation */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === link.href;

            return (
              <div key={link.href} className="relative group/link">
                <Link
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-[12px] py-2.5 transition-all duration-200 ${
                    isCollapsed ? "px-0 justify-center mx-auto w-10" : "px-3"
                  } ${
                    isActive
                      ? "bg-black/5 dark:bg-white/10 font-medium text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-black/[0.02] dark:hover:bg-white/[0.05] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <span
                    className={`shrink-0 transition-colors ${
                      isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {link.icon}
                  </span>

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[0.95rem] truncate overflow-hidden"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
                
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden rounded-md bg-[var(--color-surface-elevated)] px-2 py-1 text-xs font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] border border-[var(--color-border-soft)] group-hover/link:block z-50 whitespace-nowrap">
                    {link.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Area */}
      <div className={`mt-8 shrink-0 space-y-4 border-t border-black/[0.04] dark:border-white/5 pt-6 ${isCollapsed ? "px-2" : "px-3"}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="flex shrink-0 h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#ECE2D8] dark:border-white/10 bg-[#FBF8F5] dark:bg-white/5 text-sm font-medium text-[var(--color-text-primary)] shadow-sm">
            {profile?.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={profile.image} alt={profile?.name || "User"} className="h-full w-full object-cover" />
            ) : (
              (profile?.name?.charAt(0) || "U").toUpperCase()
            )}
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col min-w-0 overflow-hidden whitespace-nowrap"
              >
                <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">{profile?.name || "Admin"}</span>
                <span className="truncate text-xs text-[var(--color-text-secondary)]">@{profile?.username || "admin"}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={isCollapsed ? "flex justify-center" : ""}>
          {isCollapsed ? (
             <div className="group/signout relative">
                <SignOutButton iconOnly />
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden rounded-md bg-[var(--color-surface-elevated)] px-2 py-1 text-xs font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] border border-[var(--color-border-soft)] group-hover/signout:block z-50 whitespace-nowrap">
                  Sign Out
                </div>
             </div>
          ) : (
            <SignOutButton />
          )}
        </div>
      </div>
    </motion.aside>
  );
}
