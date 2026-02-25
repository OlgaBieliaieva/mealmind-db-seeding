import { readSheet } from "@/lib/sheets.read";
import { UserNutrientTargetsMap } from "@/types/user-nutrient-targets";

export async function getUserTargets(
  userId: string,
): Promise<UserNutrientTargetsMap | null> {
  // 🔹 читаємо всі таргети
  const targetRows = await readSheet("user_nutrient_targets!A2:H");

  // 🔹 фільтруємо по user
  const userRows = targetRows.filter((r) => r[1] === userId);
  if (userRows.length === 0) return null;

  // 🔹 читаємо довідник нутрієнтів
  const refRows = await readSheet("nutrients_reference!A2:L");

  // 🔹 будуємо map nutrient_id → code
  const nutrientIdToCodeMap: Record<string, string> = {};

  refRows.forEach((row) => {
    const nutrientId = row[0];
    const code = row[1];

    nutrientIdToCodeMap[nutrientId] = code;
  });

  // 🔹 будуємо фінальний map<code, value>
  const map: UserNutrientTargetsMap = {};

  userRows.forEach((row) => {
    const nutrientId = row[2];
    const value = Number(row[3]);

    const code = nutrientIdToCodeMap[nutrientId];
    if (!code) return; // safety

    map[code] = value;
  });

  return map;
}
