import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { getAuthUserProfileSafe } from "@/lib/actions/settings.actions";
import { env } from "@/env";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  const profile = (await getAuthUserProfileSafe()) || {
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
  };

  // Strictly locked down to the primary admin email
  const isAdmin = profile?.email === env.ADMIN_EMAIL || profile?.email === "shrivastavashreya071@gmail.com";

  if (!isAdmin) {
    redirect("/portal");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-[104px]">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <div className="hidden lg:block relative z-50">
          <Sidebar profile={profile} />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-104px)] overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1400px] px-8 py-10 lg:px-12 lg:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
