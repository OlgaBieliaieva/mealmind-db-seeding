import { readSheet } from "@/lib/sheets.read";
import { MenuEntry } from "@/types/menu-entry";

export async function getMenuEntries(): Promise<MenuEntry[]> {
  const rows = await readSheet("menu_entries!A2:I");

  return rows.map((row) => ({
    menu_entry_id: row[0],
    menu_day_id: row[1],
    user_id: row[2],
    meal_type_id: Number(row[3]),
    entry_type: row[4] as "recipe" | "product",
    entry_id: row[5],
    servings: row[6] ? Number(row[6]) : null,
    quantity: row[7] ? Number(row[7]) : null,
    created_at: row[8],
  }));
}
