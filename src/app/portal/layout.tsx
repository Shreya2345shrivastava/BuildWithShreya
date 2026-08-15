import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { getAuthUserProfileSafe } from "@/lib/actions/settings.actions";
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

  // Fallback to session user data if profile doesn't exist yet
  const profile = (await getAuthUserProfileSafe()) || {
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
  };

  return (
    <div className="min-h-screen bg-[#FCF8F2] pt-[104px]">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar profile={profile} />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-104px)] overflow-x-hidden">
          <div className="mx-auto max-w-5xl px-8 py-10 lg:px-12 lg:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
