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

export type RecipeListItem = {
  recipe_id: string;
  title: string;
  family_id: string | null;
  visibility: string;
};

export async function getAllRecipes(): Promise<RecipeListItem[]> {
  const rows = await readSheet("recipes!A2:I");

  return rows.map((row) => ({
    recipe_id: row[0],
    title: row[1],
    family_id: row[8],
    visibility: row[7],
  }));
}
