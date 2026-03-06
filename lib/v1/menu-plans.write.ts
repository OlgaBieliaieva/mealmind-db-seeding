import { appendRow } from "@/lib/v1/sheets.helpers";

export async function appendMenuPlan(row: string[]) {
  await appendRow("menu_plans", row);
}
