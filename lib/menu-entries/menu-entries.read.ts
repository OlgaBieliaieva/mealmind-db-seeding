import { readSheet } from "@/lib/sheets.read";
import { MenuEntry } from "@/types/menu-entry";

export async function getMenuEntries(): Promise<MenuEntry[]> {
  const rows = await readSheet("menu_entries!A2:J");

  return rows.map((row) => ({
    menu_entry_id: row[0],
    menu_plan_id: row[1],
    date: row[2],
    user_id: row[3],
    meal_type_id: Number(row[4]),
    entry_type: row[5] as "recipe" | "product",
    entry_id: row[6],
    planned_weight_g: row[7] ? Number(row[7]) : null,
    quantity_g: row[8] ? Number(row[8]) : null,
    created_at: row[9],
  }));
}
