"use server";
import { getLifeOSAuth } from "./auth";
import Reflection from "@/models/lifeos/Reflection";
import { ReflectionSchema } from "@/lib/validations/lifeos/schemas";
import { revalidatePath } from "next/cache";

export async function getReflections() {
  const userId = await getLifeOSAuth();
  const reflections = await Reflection.find({ userId }).sort({ date: -1 }).limit(30);
  return JSON.parse(JSON.stringify(reflections));
}

export async function createReflection(data: any) {
  const userId = await getLifeOSAuth();
  
  // Normalize date to midnight to enforce unique constraint easily
  const normalizedDate = new Date();
  if (data.date) {
      normalizedDate.setTime(new Date(data.date).getTime());
  }
  normalizedDate.setHours(0,0,0,0);
  data.date = normalizedDate;

  const validated = ReflectionSchema.parse({ ...data, userId });
  
  // Upsert for the day
  await Reflection.findOneAndUpdate(
    { userId, date: normalizedDate },
    { $set: validated },
    { upsert: true, new: true }
  );
  
  revalidatePath("/dashboard/lifeos");
}
