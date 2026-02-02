import { readSheet } from "@/lib/sheets.read";

export async function findRecipeRow(recipeId: string) {
  const rows = await readSheet("recipes!A2:Z");

  const index = rows.findIndex((row) => row[0] === recipeId);

  if (index === -1) return null;

  return {
    rowIndex: index + 2, // A2 offset
    row: rows[index],
  };
}
