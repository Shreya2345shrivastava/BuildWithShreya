"use server";
import { getLifeOSAuth } from "./auth";
import Vision from "@/models/lifeos/Vision";
import { VisionSchema } from "@/lib/validations/lifeos/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getVision() {
  const userId = await getLifeOSAuth();
  let vision = await Vision.findOne({ userId });
  if (!vision) {
    vision = await Vision.create({ 
      userId, 
      career: {}, financial: {}, health: {}, learning: {}, 
      creator: {}, spiritual: {}, relationships: {}, lifestyle: {} 
    });
  }
  return JSON.parse(JSON.stringify(vision));
}

export async function updateVision(data: Partial<z.infer<typeof VisionSchema>>) {
  const userId = await getLifeOSAuth();
  const validated = VisionSchema.parse({ ...data, userId });
  
  await Vision.findOneAndUpdate(
    { userId },
    { $set: validated },
    { upsert: true, new: true }
  );
  
  revalidatePath("/dashboard/lifeos/goals");
}
