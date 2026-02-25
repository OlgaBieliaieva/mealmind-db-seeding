import { appendRow } from "@/lib/sheets.helpers";
import { generateUUID } from "@/lib/uuid";
import { UserNutritionTargets } from "@/types/user-targets";

export async function createUserTargets(
  userId: string,
  targets: UserNutritionTargets,
) {
  const now = new Date().toISOString();

  await appendRow("user_nutrition_targets", [
    generateUUID(),
    userId,
    targets.calories,
    targets.protein_g,
    targets.fat_g,
    targets.carbs_g,
    targets.fiber_g,
    true,
    now,
  ]);
}
