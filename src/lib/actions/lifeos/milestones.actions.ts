"use server";
import { getLifeOSAuth } from "./auth";
import Milestone from "@/models/lifeos/Milestone";
import { MilestoneSchema } from "@/lib/validations/lifeos/schemas";
import { recalculateGoalProgress } from "./goals.actions";
import { revalidatePath } from "next/cache";

export async function getMilestones(goalId: string) {
  const userId = await getLifeOSAuth();
  const milestones = await Milestone.find({ userId, goalId }).sort({ createdAt: 1 });
  return JSON.parse(JSON.stringify(milestones));
}

export async function createMilestone(data: any) {
  const userId = await getLifeOSAuth();
  const validated = MilestoneSchema.parse({ ...data, userId });
  await Milestone.create(validated);
  await recalculateGoalProgress(validated.goalId, userId);
  revalidatePath("/dashboard/lifeos/goals");
}

export async function updateMilestone(id: string, data: any) {
  const userId = await getLifeOSAuth();
  const updated = await Milestone.findOneAndUpdate({ _id: id, userId }, { $set: data }, { new: true });
  if (updated && updated.goalId) {
    await recalculateGoalProgress(updated.goalId, userId);
  }
  revalidatePath("/dashboard/lifeos/goals");
}

export async function deleteMilestone(id: string) {
  const userId = await getLifeOSAuth();
  const deleted = await Milestone.findOneAndDelete({ _id: id, userId });
  if (deleted && deleted.goalId) {
    await recalculateGoalProgress(deleted.goalId, userId);
  }
  revalidatePath("/dashboard/lifeos/goals");
}
