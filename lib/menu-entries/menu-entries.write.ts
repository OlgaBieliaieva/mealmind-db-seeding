import { appendRow } from "@/lib/sheets.helpers";
import { generateUUID } from "@/lib/uuid";

type CreateMenuEntryInput = {
  menu_plan_id: string;
  date: string;
  user_id: string;
  meal_type_id: number;
  entry_type: "recipe" | "product";
  entry_id: string;
  servings: number | null;
  quantity: number | null;
};

export async function createMenuEntry(input: CreateMenuEntryInput) {
  await appendRow("menu_entries", [
    generateUUID(),
    input.menu_plan_id,
    input.date,
    input.user_id,
    input.meal_type_id,
    input.entry_type,
    input.entry_id,
    input.servings,
    input.quantity,
    new Date().toISOString(),
  ]);
}
