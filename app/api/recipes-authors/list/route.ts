import { readSheet } from "@/lib/sheets.read";
import { RecipeAuthor } from "@/types/recipe-author";
import { parseRecipeAuthorType } from "@/lib/parsers/recipeAuthorType";

export async function GET() {
  const rows = await readSheet("recipes_authors!A2:F");

  const items: RecipeAuthor[] = rows.map((r) => ({
    recipe_author_id: r[0],
    type: parseRecipeAuthorType(r[1]),
    display_name: r[2],
    avatar_url: r[3] || null,
    profile_url: r[4] || null,
    created_at: r[5],
  }));

  return Response.json({ items });
}
