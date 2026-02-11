import { appendRow } from "@/lib/sheets.helpers";

export async function appendMenuPlan(row: string[]) {
  await appendRow("menu_plans", row);
}
