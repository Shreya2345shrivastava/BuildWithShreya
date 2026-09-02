import { z } from "zod";

const envSchema = z.object({
  // Server-side Environment Variables
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NextAuth Secret is required"),
  AUTH_GOOGLE_ID: z.string().min(1, "Google Auth ID is required"),
  AUTH_GOOGLE_SECRET: z.string().min(1, "Google Auth Secret is required"),
  
  // Optional / Defaultable
  ADMIN_EMAIL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Client-side Environment Variables
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),
});

// Validate the environment variables
const envParse = envSchema.safeParse({
  MONGODB_URI: process.env.MONGODB_URI,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!envParse.success) {
  console.error(
    "❌ Invalid environment variables:",
    envParse.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = envParse.data;
