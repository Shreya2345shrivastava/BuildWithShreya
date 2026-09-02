"use server";
import { getLifeOSAuth } from "./auth";
import TimelineEvent from "@/models/lifeos/TimelineEvent";
import { TimelineEventSchema } from "@/lib/validations/lifeos/schemas";
import { revalidatePath } from "next/cache";

export async function getTodaysEvents() {
  const userId = await getLifeOSAuth();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const events = await TimelineEvent.find({ 
    userId,
    startTime: { $gte: startOfDay, $lte: endOfDay }
  }).sort({ startTime: 1 });
  
  return JSON.parse(JSON.stringify(events));
}

export async function createTimelineEvent(data: any) {
  const userId = await getLifeOSAuth();
  
  // If it has an _id, it's an edit, otherwise create
  if (data._id) {
    const { _id, ...updateData } = data;
    const validated = TimelineEventSchema.parse({ ...updateData, userId });
    await TimelineEvent.findOneAndUpdate({ _id, userId }, { $set: validated });
  } else {
    const validated = TimelineEventSchema.parse({ ...data, userId });
    await TimelineEvent.create(validated);
  }
  
  revalidatePath("/dashboard/lifeos");
}

export async function deleteTimelineEvent(eventId: string) {
  const userId = await getLifeOSAuth();
  await TimelineEvent.findOneAndDelete({ _id: eventId, userId });
  revalidatePath("/dashboard/lifeos");
}
