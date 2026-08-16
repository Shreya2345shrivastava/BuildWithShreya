"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserMenu({ profile }: { profile?: { name?: string; image?: string; username?: string; email?: string } }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  if (!session) {
    return (
      <Link
        href="/sign-in"
        className="
          text-[0.95rem]
          font-medium
          tracking-[-0.01em]
          text-[var(--color-text-secondary)]
          transition-all
          duration-300
          hover:text-[var(--color-accent-peach)]
        "
      >
        Sign In
      </Link>
    );
  }

  const userName = profile?.name || session.user?.name || "User";
  const userEmail = profile?.email || session.user?.email || "";
  
  const isAdmin = userEmail === "shrivastavashreya071@gmail.com";

  const firstName = userName.split(" ")[0];

  const initials = userName
    .split(" ")
    .map((word: string) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const imageUrl = profile?.image || session.user?.image;

  const hasImage =
    typeof imageUrl === "string" &&
    imageUrl.trim().length > 0;

  return (
    <div
      ref={menuRef}
      className="relative z-50"
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          group
          flex
          items-center
          gap-2.5
          rounded-full
          border
          border-transparent
          px-2
          py-1.5
          transition-all
          duration-300
          hover:bg-black/5
        "
      >
        {/* Avatar */}
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border
            border-[#ECE2D8]
            bg-[#FBF8F5]
            text-xs
            font-medium
            text-[#5E544C] dark:text-[#a0aba5]
            shadow-sm
            transition-transform
            duration-300
            group-hover:scale-105
          "
        >
          {hasImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={userName}
                className="h-full w-full object-cover"
              />
            </>
          ) : (
            initials
          )}
        </div>

        {/* Name */}
        <div className="hidden lg:flex flex-col items-start leading-none pr-1">
          <span className="font-medium text-[var(--color-text-primary)] text-sm">
            {firstName}
          </span>
        </div>

        {/* Arrow */}
        <ChevronDown
          className={cn(
            "hidden lg:block h-4 w-4 text-[#8D7F73] transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute right-0 top-[calc(100%+0.5rem)] w-64 overflow-hidden rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/95 backdrop-blur-xl shadow-lg transition-all duration-200 ease-out origin-top-right",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-95 opacity-0 -translate-y-2"
        )}
      >
        {/* User Header */}
        <div className="border-b border-[var(--color-border-soft)] dark:border-[#2a332d]/50 bg-[#FBF8F5]/80 dark:bg-[#131715]/80 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-[#ECE2D8]
                bg-[var(--color-surface-elevated)] dark:bg-[#242b28]
                text-sm
                font-medium
                text-[#5E544C] dark:text-[#a0aba5]
              "
            >
              {hasImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                </>
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                {userName}
              </p>

              <p className="mt-0.5 truncate text-xs text-[#8B7F74]">
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-1 p-2">
          <Link
            href={isAdmin ? "/dashboard" : "/portal"}
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-medium
              text-[#5E544C] dark:text-[#a0aba5]
              transition-all
              hover:bg-[#FBF8F5] dark:hover:bg-[#2b3330]/50
              hover:text-[var(--color-text-primary)]
            "
          >
            <LayoutDashboard className="mr-3 h-4 w-4 text-[#8B7F74]" />
            {isAdmin ? "Author Dashboard" : "Reader Portal"}
          </Link>

          {isAdmin && (
            <Link
              href="/dashboard/notifications"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-medium
                text-[#5E544C] dark:text-[#a0aba5]
                transition-all
                hover:bg-[#FBF8F5] dark:hover:bg-[#2b3330]/50
                hover:text-[var(--color-text-primary)]
              "
            >
              <Bell className="mr-3 h-4 w-4 text-[#8B7F74]" />
              Notifications
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-medium
                text-[#5E544C] dark:text-[#a0aba5]
                transition-all
                hover:bg-[#FBF8F5] dark:hover:bg-[#2b3330]/50
                hover:text-[var(--color-text-primary)]
              "
            >
              <Settings className="mr-3 h-4 w-4 text-[#8B7F74]" />
              Settings
            </Link>
          )}
        </div>

        {/* Sign Out */}
        <div className="border-t border-[var(--color-border-soft)] dark:border-[#2a332d]/50 p-2">
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="
              flex
              w-full
              items-center
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-medium
              text-[#C97B4C]
              transition-all
              hover:bg-[#FFF7F1] dark:hover:bg-[#2b3330]/50
            "
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}