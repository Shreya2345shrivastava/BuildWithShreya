"use server";

import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Profile } from "@/models/Profile";
import { BrandSettings } from "@/models/BrandSettings";
import { NotificationSettings } from "@/models/NotificationSettings";
import { revalidatePath } from "next/cache";
import { ProfileUpdateSchema, BrandUpdateSchema, NotificationUpdateSchema } from "@/lib/validations";
import { z } from "zod";

async function getAuthEmail() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  await connectDB();
  return session.user.email;
}

export async function getUserSettings() {
  try {
    const email = await getAuthEmail();
    
    // Fetch all related documents
    const [profile, brand, notifications, user] = await Promise.all([
      Profile.findOne({ email }).lean(),
      BrandSettings.findOne({ email }).lean(),
      NotificationSettings.findOne({ email }).lean(),
      User.findOne({ email }).lean()
    ]);

    // Construct unified settings object for the client
    const settings = {
      name: profile?.name || user?.name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      image: profile?.image || user?.image || "",
      
      brandName: brand?.brandName || "",
      brandDescription: brand?.brandDescription || "",
      website: brand?.website || "",
      twitter: brand?.twitter || "",
      linkedin: brand?.linkedin || "",
      brandLogo: brand?.brandLogo || "",
      colorPrimary: brand?.colorPrimary || "#201913",
      colorAccent: brand?.colorAccent || "#d9a48f",

      newSubscriberAlerts: notifications?.newSubscriberAlerts ?? true,
      newsletterSignupAlerts: notifications?.newsletterSignupAlerts ?? true,
      newBookPurchaseAlerts: notifications?.newBookPurchaseAlerts ?? true,
      blogCommentAlerts: notifications?.blogCommentAlerts ?? true,
      weeklySummaryEmail: notifications?.weeklySummaryEmail ?? false,
    };

    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("getUserSettings error:", error);
    throw new Error("Failed to load settings");
  }
}

export async function getAuthUserProfileSafe() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return null;
    await connectDB();
    const profile = await Profile.findOne({ email: session.user.email }).lean();
    if (!profile) return null;
    return JSON.parse(JSON.stringify(profile));
  } catch {
    return null;
  }
}

export async function updateProfile(data: z.infer<typeof ProfileUpdateSchema>) {
  try {
    const validated = ProfileUpdateSchema.parse(data);
    const email = await getAuthEmail();
    
    // Check for username collision across all profiles
    if (validated.username) {
      const existing = await Profile.findOne({ 
        username: validated.username, 
        email: { $ne: email } 
      });
      if (existing) {
        throw new Error("Username is already taken");
      }
    }

    await Profile.findOneAndUpdate(
      { email },
      { $set: validated },
      { new: true, upsert: true }
    );
    
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to update profile" };
  }
}

export async function updateBranding(data: z.infer<typeof BrandUpdateSchema>) {
  try {
    const validated = BrandUpdateSchema.parse(data);
    const email = await getAuthEmail();
    
    await BrandSettings.findOneAndUpdate(
      { email },
      { $set: validated },
      { new: true, upsert: true }
    );
    
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to update branding" };
  }
}

export async function updateNotifications(data: z.infer<typeof NotificationUpdateSchema>) {
  try {
    const validated = NotificationUpdateSchema.parse(data);
    const email = await getAuthEmail();
    
    await NotificationSettings.findOneAndUpdate(
      { email },
      { $set: validated },
      { new: true, upsert: true }
    );
    
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to update notifications" };
  }
}

export async function deleteAccount() {
  try {
    const email = await getAuthEmail();
    await Promise.all([
      User.deleteOne({ email }),
      Profile.deleteOne({ email }),
      BrandSettings.deleteOne({ email }),
      NotificationSettings.deleteOne({ email }),
    ]);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete account" };
  }
}

export async function getGlobalBrandSettings() {
  try {
    await connectDB();
    // In a multi-tenant app, you'd fetch by domain/slug.
    // For a single-author SaaS, we just fetch the first one or a specific admin.
    const brand = await BrandSettings.findOne().lean();
    return brand ? JSON.parse(JSON.stringify(brand)) : null;
  } catch (error) {
    console.error("getGlobalBrandSettings error:", error);
    return null;
  }
}

export async function getPublicProfile(username: string) {
  try {
    await connectDB();
    const profile = await Profile.findOne({ username }).lean();
    if (!profile) return null;
    return JSON.parse(JSON.stringify(profile));
  } catch (error) {
    console.error("getPublicProfile error:", error);
    return null;
  }
}
