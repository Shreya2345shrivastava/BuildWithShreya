"use server";
import { getLifeOSAuth } from "./auth";
import Task from "@/models/lifeos/Task";
import { TaskSchema } from "@/lib/validations/lifeos/schemas";
import { revalidatePath } from "next/cache";
import { recalculateGoalProgress } from "./goals.actions";
import { updateLifeAreaScore } from "./areas.actions";

export async function getTasks() {
  const userId = await getLifeOSAuth();
  // Get today's tasks
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  const tasks = await Task.find({ 
    userId,
    $or: [
      { dueDate: { $gte: startOfDay, $lte: endOfDay } },
      { scheduledTime: { $gte: startOfDay, $lte: endOfDay } },
      { dueDate: { $exists: false }, scheduledTime: { $exists: false } },
    ],
  }).sort({ scheduledTime: 1 });
  return JSON.parse(JSON.stringify(tasks));
}

export async function getTasksByGoalId(goalId: string) {
  const userId = await getLifeOSAuth();
  const tasks = await Task.find({ userId, linkedGoalId: goalId }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(tasks));
}

export async function createTask(data: any) {
  const userId = await getLifeOSAuth();
  const validated = TaskSchema.parse({ ...data, userId });
  await Task.create(validated);
  revalidatePath("/dashboard/lifeos");
}

export async function toggleTaskCompletion(taskId: string, completed: boolean) {
  const userId = await getLifeOSAuth();
  const task = await Task.findOneAndUpdate({ _id: taskId, userId }, { completed }, { new: true });
  
  if (task) {
    if (task.linkedGoalId) {
      await recalculateGoalProgress(task.linkedGoalId.toString());
    }
    if (task.category) {
      // Award 2 points for completing a task, deduct 2 for unchecking
      const points = completed ? 2 : -2;
      await updateLifeAreaScore(task.category, points);
    }
  }

  revalidatePath("/dashboard/lifeos");
}
