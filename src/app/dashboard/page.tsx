import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <div className="rounded-3xl border p-8 shadow-sm">
        <h1 className="text-4xl font-serif">
          Welcome, {session.user?.name}
        </h1>

        <p className="mt-4 text-lg">
          {session.user?.email}
        </p>

        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="mt-6 h-20 w-20 rounded-full"
          />
        )}
      </div>

      <div className="mt-8">
  <SignOutButton />
</div>
    </main>
  );
}