"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="w-full rounded-2xl border border-red-200 bg-white px-4 py-3 font-medium text-red-500 transition hover:bg-red-50"
    >
      🚪 Sign Out
    </button>
  );
}