import { getSheetsClient } from "@/lib/v1/sheets";

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
