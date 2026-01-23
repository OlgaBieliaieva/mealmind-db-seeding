import { sheets, SPREADSHEET_ID } from "./sheets";

export async function appendRow(
  sheetName: string,
  values: (string | number | boolean | null)[],
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}
