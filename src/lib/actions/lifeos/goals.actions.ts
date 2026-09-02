"use server";
import { getLifeOSAuth } from "./auth";
import Goal from "@/models/lifeos/Goal";
import { GoalSchema } from "@/lib/validations/lifeos/schemas";
import Task from "@/models/lifeos/Task";
import Milestone from "@/models/lifeos/Milestone";
import { revalidatePath } from "next/cache";

export async function getGoals() {
  const userId = await getLifeOSAuth();
  const goals = await Goal.find({ userId }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(goals));
}

export async function createGoal(data: any) {
  const userId = await getLifeOSAuth();
  const validated = GoalSchema.parse({ ...data, userId });
  await Goal.create(validated);
  revalidatePath("/dashboard/lifeos");
  revalidatePath("/dashboard/lifeos/goals");
}

export async function updateGoal(id: string, data: any) {
  const userId = await getLifeOSAuth();
  await Goal.findOneAndUpdate({ _id: id, userId }, { $set: data });
  revalidatePath("/dashboard/lifeos");
  revalidatePath("/dashboard/lifeos/goals");
}

export async function deleteGoal(id: string) {
  const userId = await getLifeOSAuth();
  await Goal.findOneAndDelete({ _id: id, userId });
  // Also delete child goals and tasks ideally, but we'll stick to basic delete for now
  revalidatePath("/dashboard/lifeos");
  revalidatePath("/dashboard/lifeos/goals");
}

export async function recalculateGoalProgress(goalId: string, userId: string) {
  // 1. Fetch the goal
  const goal = await Goal.findOne({ _id: goalId, userId });
  if (!goal) return;

  // 2. Fetch all child goals
  const childGoals = await Goal.find({ parentGoalId: goalId, userId });
  
  // 3. Fetch all child tasks (using linkedGoalId on task OR tasks in linkedTasks array)
  const childTasks = await Task.find({
    userId,
    $or: [
      { linkedGoalId: goalId },
      { _id: { $in: goal.linkedTasks || [] } }
    ]
  });

  // 4. Fetch all child milestones
  const childMilestones = await Milestone.find({ goalId: goalId, userId });

  const totalChildren = childGoals.length + childTasks.length + childMilestones.length;
  
  if (totalChildren > 0) {
    let totalProgress = 0;
    
    // Sum child goals progress
    for (const cg of childGoals) {
      totalProgress += (cg.progress || 0);
    }
    
    // Sum child tasks progress (100 if completed, 0 if not)
    for (const ct of childTasks) {
      totalProgress += ct.completed ? 100 : 0;
    }

    // Sum child milestones progress (100 if completed, else use its progress)
    for (const cm of childMilestones) {
      if (cm.status === "completed") {
        totalProgress += 100;
      } else {
        totalProgress += (cm.progress || 0);
      }
    }
    
    const newProgress = Math.round(totalProgress / totalChildren);
    
    // Update if changed
    if (goal.progress !== newProgress) {
      goal.progress = newProgress;
      
      // Auto-update status based on progress
      if (newProgress === 100) {
        goal.status = "completed";
      } else if (newProgress > 0 && goal.status === "not_started") {
        goal.status = "in_progress";
      }
      
      await goal.save();
    }
  }

  // 4. Recursively update parent
  if (goal.parentGoalId) {
    await recalculateGoalProgress(goal.parentGoalId, userId);
  }
}
