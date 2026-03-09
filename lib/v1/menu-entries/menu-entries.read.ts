import { readSheet } from "@/lib/v1/sheets.read";
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

export async function getMenuEntryById(
  menuEntryId: string,
): Promise<MenuEntry | null> {
  const rows = await readSheet("menu_entries!A2:J");

  const row = rows.find((r) => r[0] === menuEntryId);

  if (!row) return null;

  return {
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
  };
}

export async function getMenuEntriesByContext(input: {
  planId: string;
  entryType: "recipe" | "product";
  entryId: string;
  userId: string;
  mealTypeId: number;
}) {
  const rows = await readSheet("menu_entries!A2:J");

  return rows
    .map(
      (row): MenuEntry => ({
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
      }),
    )
    .filter(
      (entry) =>
        entry.menu_plan_id === input.planId &&
        entry.entry_type === input.entryType &&
        entry.entry_id === input.entryId &&
        entry.user_id === input.userId &&
        entry.meal_type_id === input.mealTypeId,
    );
}
