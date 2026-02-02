import { getSheetsClient } from "@/lib/sheets";

export async function updateSheetRow(
  range: string,
  values: (string | number | boolean | null)[],
) {
  const { sheets, spreadsheetId } = getSheetsClient();

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}
