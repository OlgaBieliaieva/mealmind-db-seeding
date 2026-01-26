import { getSheetsClient } from "./sheets";

export async function appendRow(
  sheetName: string,
  values: (string | number | boolean | null)[],
) {
  const { sheets, spreadsheetId } = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}
