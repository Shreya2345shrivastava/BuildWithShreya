import { getGoals } from "@/lib/actions/lifeos/goals.actions";
import { getVision } from "@/lib/actions/lifeos/vision.actions";
import { GoalsHub } from "@/components/dashboard/lifeos/goals/GoalsHub";

export const metadata = {
  title: "Goals - LifeOS",
};

export default async function GoalsPage() {
  const goals = await getGoals();
  const vision = await getVision();

  return (
    <div className="max-w-6xl mx-auto w-full pb-32">
      <GoalsHub goals={goals} vision={vision} />
    </div>
  );
}
