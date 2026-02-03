import { readSheet } from "@/lib/sheets.read";
import { updateSheetRow } from "@/lib/sheets.update";

export async function deleteRowsByRecipeId(
  sheetName: string,
  recipeId: string,
) {
  const rows = await readSheet(`${sheetName}!A2:Z`);

  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i][1] === recipeId) {
      const rowIndex = i + 2;
      await updateSheetRow(`${sheetName}!A${rowIndex}:Z${rowIndex}`, []);
    }
  }
}
