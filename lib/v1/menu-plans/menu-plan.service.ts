import { readSheet } from "@/lib/v1/sheets.read";
import { appendRow } from "@/lib/v1/sheets.helpers";
import { generateUUID } from "@/lib/v1/uuid";
import { getWeekStart } from "@/lib/v1/date/getWeekStart";

export async function getOrCreateMenuPlan(familyId: string, date: string) {
  const weekStart = getWeekStart(date);

  const rows = await readSheet("menu_plans!A2:D");

  const existing = rows.find(
    (row) => row[1] === familyId && row[2] === weekStart,
  );

  if (existing) {
    return {
      menu_plan_id: existing[0], // ✅ fixed
      family_id: familyId,
      week_start_date: weekStart,
    };
  }

  const newId = generateUUID();

  await appendRow("menu_plans", [
    newId,
    familyId,
    weekStart,
    new Date().toISOString(),
  ]);

  return {
    menu_plan_id: newId,
    family_id: familyId,
    week_start_date: weekStart,
  };
}
