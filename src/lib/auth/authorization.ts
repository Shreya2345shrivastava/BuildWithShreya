import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User, type IUser, type UserRole } from "@/models/User";
import { env } from "@/env";

const BOOTSTRAP_ADMIN_EMAIL = "shrivastavashreya071@gmail.com";

function isBootstrapAdmin(email: string) {
  return email === BOOTSTRAP_ADMIN_EMAIL || email === env.ADMIN_EMAIL?.toLowerCase();
}

export async function ensureUserRecord({
  email,
  name,
  image,
}: {
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  await connectDB();

  const normalizedEmail = email.toLowerCase();
  const bootstrapAdmin = isBootstrapAdmin(normalizedEmail);
  const update = bootstrapAdmin
    ? {
        $set: { role: "admin" as const },
        $setOnInsert: {
          email: normalizedEmail,
          name: name || undefined,
          image: image || undefined,
        },
      }
    : {
        $setOnInsert: {
          email: normalizedEmail,
          name: name || undefined,
          image: image || undefined,
          role: "customer" as const,
        },
      };

  return User.findOneAndUpdate({ email: normalizedEmail }, update, {
    new: true,
    upsert: true,
  }).lean<IUser>();
}

export async function requireRole(allowedRoles: UserRole | UserRole[]) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await ensureUserRecord({
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
  });
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const normalizedEmail = session.user.email.toLowerCase();

  if (isBootstrapAdmin(normalizedEmail) && roles.includes("admin")) {
    return { session, user: { ...user, role: "admin" as const } };
  }

  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return { session, user };
}

export function authorizationErrorResponse(error: unknown) {
  const unauthorized = error instanceof Error && error.message === "Unauthorized";
  return NextResponse.json(
    { success: false, message: unauthorized ? "Unauthorized" : "Forbidden" },
    { status: unauthorized ? 401 : 403 }
  );
}