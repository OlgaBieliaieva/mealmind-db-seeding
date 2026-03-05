import { appendRow } from "@/lib/v1/sheets.helpers";
import { readSheet } from "@/lib/v1/sheets.read";
import { generateUUID } from "@/lib/v1/uuid";
import { UserNutrientTargetsMap } from "@/types/user-nutrient-targets";

export async function createUserTargets(
  userId: string,
  targets: UserNutrientTargetsMap,
) {
  const now = new Date().toISOString();

  // 🔹 читаємо довідник нутрієнтів
  const refRows = await readSheet("nutrients_reference!A2:L");

  // 🔹 будуємо map code → nutrient_id
  const codeToNutrientIdMap: Record<string, string> = {};

  refRows.forEach((row) => {
    const nutrientId = row[0];
    const code = row[1];
    codeToNutrientIdMap[code] = nutrientId;
  });

  // 🔹 створюємо рядки для запису
  for (const code in targets) {
    const nutrientId = codeToNutrientIdMap[code];
    if (!nutrientId) continue; // safety

    const row = [
      generateUUID(), // id
      userId, // user_id
      nutrientId, // nutrient_id
      targets[code], // target_value
      true, // calculated
      now, // created_at
      now, // updated_at
    ];

    await appendRow("user_nutrient_targets", row);
  }
}
