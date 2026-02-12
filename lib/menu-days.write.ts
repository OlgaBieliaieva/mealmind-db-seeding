import { appendRow } from "@/lib/sheets.helpers";

export async function appendMenuDay(row: (string | number | boolean | null)[]) {
  await appendRow("menu_days", row);
}
