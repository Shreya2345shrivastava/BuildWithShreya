"use client";

import { signOut } from "next-auth/react";

type Props = {
  name?: string | null;
  email?: string | null;
};

export function DashboardHeader({
  name,
  email,
}: Props) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            {name}
          </p>

          <p className="text-xs text-gray-400">
            {email}
          </p>
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="rounded-xl bg-black px-5 py-3 text-white"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}