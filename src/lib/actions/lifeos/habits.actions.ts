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

export async function toggleHabitCompletion(habitId: string, completed: boolean) {
  const userId = await getLifeOSAuth();
  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) return { success: false, error: "Habit not found" };

  const todayKey = new Date().toISOString().slice(0, 10);
  const history = (habit.completionHistory || []).filter((entry: { date?: Date }) =>
    new Date(entry.date || 0).toISOString().slice(0, 10) !== todayKey
  );

  history.push({
    date: new Date(),
    count: completed ? habit.targetCount || 1 : 0,
    status: completed ? "completed" : "skipped",
  });

  const completedDates = history
    .filter((entry: { status?: string }) => entry.status === "completed")
    .map((entry: { date?: Date }) => new Date(entry.date || 0).toISOString().slice(0, 10));
  const uniqueDates = [...new Set(completedDates)].sort().reverse();

  let currentStreak = 0;
  const cursor = new Date();
  for (const date of uniqueDates) {
    if (date !== cursor.toISOString().slice(0, 10)) break;
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  let longestStreak = 0;
  let streak = 0;
  let previousDate: Date | null = null;
  for (const date of [...new Set(completedDates)].sort()) {
    const currentDate = new Date(`${date}T00:00:00.000Z`);
    const isConsecutive = previousDate && currentDate.getTime() - previousDate.getTime() === 86400000;
    streak = isConsecutive ? streak + 1 : 1;
    longestStreak = Math.max(longestStreak, streak);
    previousDate = currentDate;
  }

  habit.completionHistory = history;
  habit.currentStreak = currentStreak;
  habit.longestStreak = Math.max(habit.longestStreak || 0, longestStreak);
  habit.completionRate = history.length
    ? Math.round((completedDates.length / history.length) * 100)
    : 0;
  await habit.save();
  revalidatePath("/dashboard/lifeos");

  return { success: true };
}
