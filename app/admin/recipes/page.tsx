import { readSheet } from "@/lib/sheets.read";
import RecipesList from "@/components/recipe/RecipesList";

export const dynamic = "force-dynamic";

export default async function AdminRecipesPage() {
  const rows = await readSheet("recipes!A2:Z");

  const items = rows.map((row) => ({
    recipe_id: row[0],
    title: row[1],
    status: row[9],
    visibility: row[7],
    photo_url: row[16] ?? null,
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Recipes</h1>
      <RecipesList items={items} />
    </div>
  );
}
