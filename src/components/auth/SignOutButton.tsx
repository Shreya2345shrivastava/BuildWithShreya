"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/sign-in",
        })
      }
      className="rounded-full bg-black px-8 py-4 text-white"
    >
      Sign Out
    </button>
  );
}