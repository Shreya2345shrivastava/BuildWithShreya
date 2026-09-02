"use server";
import { getLifeOSAuth } from "./auth";
import Habit from "@/models/lifeos/Habit";
import { HabitSchema } from "@/lib/validations/lifeos/schemas";
import { revalidatePath } from "next/cache";

export async function getHabits() {
  const userId = await getLifeOSAuth();
  const habits = await Habit.find({ userId }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(habits));
}

export async function createHabit(data: any) {
  const userId = await getLifeOSAuth();
  const validated = HabitSchema.parse({ ...data, userId });
  await Habit.create(validated);
  revalidatePath("/dashboard/lifeos");
}
