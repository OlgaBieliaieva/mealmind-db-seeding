import { readSheet } from "@/lib/sheets.read";
import { MenuEntry } from "@/types/menu-entry";

export async function getMenuEntries(): Promise<MenuEntry[]> {
  const rows = await readSheet("menu_entries!A2:F");

  return rows.map((row) => ({
    menu_entry_id: row[0],
    menu_day_id: row[1],
    user_id: row[2],
    meal_type_id: Number(row[3]),
    recipe_id: row[4] ?? null,
    servings: row[5] ? Number(row[5]) : null,
  }));
}
