"use server";
import { getLifeOSAuth } from "./auth";
import LifeArea from "@/models/lifeos/LifeArea";

export async function getLifeAreas() {
  const userId = await getLifeOSAuth();
  const areas = await LifeArea.find({ userId });
  return JSON.parse(JSON.stringify(areas));
}

export async function updateLifeAreaScore(areaName: string, userId: string, points: number) {
  // Try to find the area
  let area = await LifeArea.findOne({ name: areaName, userId });
  
  if (!area) {
    // If area doesn't exist yet, we can create it
    area = await LifeArea.create({
      name: areaName,
      userId,
      score: 0,
      todayProgress: 0,
    });
  }

  const newScore = Math.min(100, Math.max(0, (area.score || 0) + points));
  const newTodayProgress = Math.min(100, Math.max(0, (area.todayProgress || 0) + (points > 0 ? 10 : 0))); // e.g. 10% progress per task
  
  await LifeArea.updateOne(
    { _id: area._id }, 
    { 
      $set: { 
        score: newScore,
        todayProgress: newTodayProgress
      } 
    }
  );
}
