import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { env } from "@/env";

export async function getLifeOSAuth() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  
  // Strictly locked down to the primary admin email
  const isAdmin = session.user.email === env.ADMIN_EMAIL || session.user.email === "shrivastavashreya071@gmail.com";
  if (!isAdmin) {
    throw new Error("Forbidden: LifeOS is private");
  }

  await connectDB();
  return session.user.email;
}
