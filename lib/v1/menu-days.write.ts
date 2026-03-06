import { appendRow } from "@/lib/v1/sheets.helpers";

export async function appendMenuDay(row: (string | number | boolean | null)[]) {
  await appendRow("menu_days", row);
}
