"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link href="/sign-in">
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {session.user?.image ? (
        <img
          src={session.user.image}
          alt={session.user.name ?? "User"}
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white">
          {session.user?.name?.charAt(0)}
        </div>
      )}

      <Link href="/dashboard">
        Dashboard
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </button>
    </div>
  );
}