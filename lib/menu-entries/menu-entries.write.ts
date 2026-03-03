import { appendRow, updateRow } from "@/lib/sheets.helpers";
import { readSheet } from "../sheets.read";
import { generateUUID } from "@/lib/uuid";
import { MenuEntry } from "@/types/menu-entry";

/**
 * CREATE
 */
export async function createMenuEntry(input: {
  menu_plan_id: string;
  date: string;
  user_id: string;
  meal_type_id: number;
  entry_type: "recipe" | "product";
  entry_id: string;
  planned_weight_g: number | null;
  quantity_g: number | null;
}) {
  await appendRow("menu_entries", [
    generateUUID(),
    input.menu_plan_id,
    input.date,
    input.user_id,
    input.meal_type_id,
    input.entry_type,
    input.entry_id,
    input.planned_weight_g,
    input.quantity_g,
    new Date().toISOString(),
  ]);
}

/**
 * UPDATE
 */
export async function updateMenuEntry(
  existingEntry: MenuEntry,
  updates: {
    date: string;
    user_id: string;
    meal_type_id: number;
    planned_weight_g: number | null;
    quantity_g: number | null;
  },
) {
  await updateRow(
    "menu_entries",
    existingEntry.menu_entry_id,
    [
      existingEntry.menu_entry_id,
      existingEntry.menu_plan_id,
      updates.date,
      updates.user_id,
      updates.meal_type_id,
      existingEntry.entry_type,
      existingEntry.entry_id,
      updates.planned_weight_g,
      updates.quantity_g,
      existingEntry.created_at,
    ],
    0,
  );
}

/**
 * DELETE
 */
export async function deleteMenuEntry(menuEntryId: string) {
  const rows = await readSheet("menu_entries!A2:J");

  const filtered = rows.filter((row) => row[0] !== menuEntryId);

  if (filtered.length === rows.length) return;

  // const { appendRows } = await import("@/lib/sheets.helpers");

  const { getSheetsClient } = await import("@/lib/sheets");
  const { sheets, spreadsheetId } = getSheetsClient();

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "menu_entries!A2:J",
  });

  if (filtered.length > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "menu_entries!A2:J",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: filtered },
    });
  }
}
