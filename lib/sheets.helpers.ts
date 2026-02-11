import { getSheetsClient } from "./sheets";

export type SheetCell = string | number | boolean | null | Date;
export type SheetRow = SheetCell[];

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

/**
 * ✅ Batch append rows
 */
export async function appendRows(
  sheetName: string,
  rows: (string | number | boolean | null)[][],
) {
  if (rows.length === 0) return;

  const { sheets, spreadsheetId } = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: rows,
    },
  });
}

/**
 * Видаляє всі рядки з sheet, де вказане поле recipe_id === значенню
 * ⚠️ Працює через перезапис таблиці (Google Sheets limitation)
 */
export async function deleteRowsByRecipeId(
  sheetName: string,
  recipeId: string,
  recipeIdColumnIndex = 0, // за замовчуванням перша колонка
) {
  const { sheets, spreadsheetId } = getSheetsClient();

  const range = `${sheetName}!A2:Z`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = (res.data.values ?? []) as string[][];

  const filteredRows = rows.filter(
    (row) => row[recipeIdColumnIndex] !== recipeId,
  );

  // якщо нічого не змінилось — не пишемо назад
  if (filteredRows.length === rows.length) return;

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range,
  });

  if (filteredRows.length > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: filteredRows,
      },
    });
  }
}

/**
 * Видаляє запис з recipe_favorites
 * where recipe_id + user_id + family_id
 */
export async function deleteRecipeFavorite(
  recipeId: string,
  userId: string,
  familyId: string,
) {
  const { sheets, spreadsheetId } = getSheetsClient();

  const range = "recipe_favorites!A2:E";

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = (res.data.values ?? []) as string[][];

  const filtered = rows.filter(
    (row) => !(row[1] === recipeId && row[2] === userId && row[3] === familyId),
  );

  if (filtered.length === rows.length) return;

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range,
  });

  if (filtered.length > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: filtered,
      },
    });
  }
}

export async function deleteRowsRecipeId(
  sheetName: string,
  recipeId: string,
  recipeIdColumnIndex: number,
) {
  const { sheets, spreadsheetId } = getSheetsClient();

  const range = `${sheetName}!A2:Z`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = (res.data.values ?? []) as string[][];

  if (!rows.length) return;

  const filteredRows = rows.filter(
    (row) => row[recipeIdColumnIndex] !== recipeId,
  );

  if (filteredRows.length === rows.length) return;

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range,
  });

  if (filteredRows.length > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: filteredRows,
      },
    });
  }
}

export async function updateRow(
  sheetName: string,
  recipeId: string,
  newRow: SheetRow,
  idColumnIndex = 0,
) {
  const { sheets, spreadsheetId } = getSheetsClient();

  const range = `${sheetName}!A2:Z`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = (res.data.values ?? []) as SheetRow[];

  const updatedRows = rows.map((row) =>
    row[idColumnIndex] === recipeId ? newRow : row,
  );

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: updatedRows,
    },
  });
}
