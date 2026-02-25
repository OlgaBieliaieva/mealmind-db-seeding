import { readSheet } from "@/lib/sheets.read";
import { UserNutritionTargets } from "@/types/user-targets";

export async function getUserTargets(
  userId: string,
): Promise<UserNutritionTargets | null> {
  const rows = await readSheet("user_nutrition_targets!A2:H");

  const row = rows.find((r) => r[1] === userId);
  if (!row) return null;

  return {
    calories: Number(row[2]),
    protein_g: Number(row[3]),
    fat_g: Number(row[4]),
    carbs_g: Number(row[5]),
    fiber_g: Number(row[6]),
  };
}
