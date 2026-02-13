import { appendRow } from "@/lib/sheets.helpers";
import { generateUUID } from "../uuid";

type CreateMenuEntryInput = {
  menu_day_id: string;
  user_id: string;
  meal_type_id: number;
  entry_type: "recipe" | "product";
  entry_id: string;
  servings: number | null;
  quantity: number | null;
};

export async function createMenuEntry(input: CreateMenuEntryInput) {
  await appendRow("menu_entries", [
    generateUUID(), // menu_entry_id
    input.menu_day_id,
    input.user_id,
    input.meal_type_id,
    input.entry_type,
    input.entry_id,
    input.servings,
    input.quantity,
    new Date().toISOString(),
  ]);
}
