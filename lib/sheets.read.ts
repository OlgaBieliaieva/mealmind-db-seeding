import { getSheetsClient } from "@/lib/sheets";

export async function readSheet(range: string): Promise<string[][]> {
  const { sheets, spreadsheetId } = getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return (res.data.values ?? []) as string[][];
}
