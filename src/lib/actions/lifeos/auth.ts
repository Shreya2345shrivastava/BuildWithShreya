import { requireRole } from "@/lib/auth/authorization";

export async function getLifeOSAuth() {
  const { user } = await requireRole("admin");
  return user.email;
}
