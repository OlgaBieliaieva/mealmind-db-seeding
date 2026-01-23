import { sheets, SPREADSHEET_ID } from "@/lib/sheets";

export async function readSheet(range: string): Promise<string[][]> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  return (res.data.values ?? []) as string[][];
}
