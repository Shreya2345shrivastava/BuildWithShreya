"use server";
import { getLifeOSAuth } from "./auth";
import DailyMetric from "@/models/lifeos/DailyMetric";
import { DailyMetricSchema } from "@/lib/validations/lifeos/schemas";
import { revalidatePath } from "next/cache";

export async function getDailyMetrics(date: Date) {
  const userId = await getLifeOSAuth();
  // Normalize date to midnight
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  
  const metric = await DailyMetric.findOne({ userId, date: normalizedDate });
  return metric ? JSON.parse(JSON.stringify(metric)) : null;
}

export async function updateDailyMetric(data: any) {
  const userId = await getLifeOSAuth();
  const normalizedDate = new Date(data.date);
  normalizedDate.setHours(0, 0, 0, 0);
  data.date = normalizedDate;

  const validated = DailyMetricSchema.parse({ ...data, userId });
  
  await DailyMetric.findOneAndUpdate(
    { userId, date: normalizedDate },
    { $set: validated },
    { upsert: true, new: true }
  );
  revalidatePath("/dashboard/lifeos");
}
