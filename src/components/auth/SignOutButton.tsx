"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className={`rounded-2xl border border-red-200 bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-3 font-medium text-red-500 transition hover:bg-red-50 flex items-center justify-center gap-2 ${iconOnly ? 'px-3 w-auto' : 'px-4 w-full'}`}
    >
      <LogOut size={16} />
      {!iconOnly && <span>Sign Out</span>}
    </button>
  );
}