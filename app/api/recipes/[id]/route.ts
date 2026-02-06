import { readSheet } from "@/lib/sheets.read";
import { z } from "zod";

const ParamsSchema = z.object({
  id: z.string().uuid(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = ParamsSchema.parse(params);

  const [recipes, ingredients, steps, cuisines] = await Promise.all([
    readSheet("recipes!A2:R"),
    readSheet("recipe_ingredients!A2:F"),
    readSheet("recipe_steps!A2:E"),
    readSheet("recipe_cuisines!A2:C"),
  ]);

  const recipe = recipes.find((r) => r[0] === id);
  if (!recipe) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({
    recipe: {
      recipe_id: recipe[0],
      title: recipe[1],
      description: recipe[2],
      recipe_type_id: recipe[3],
      author_type: recipe[4],
      visibility: recipe[6],
      status: recipe[8],
      base_servings: Number(recipe[9]),
      base_output_weight_g: Number(recipe[10]),
      prep_time_min: Number(recipe[12] || 0),
      cook_time_min: Number(recipe[13] || 0),
      difficulty: recipe[14],
      photo_url: recipe[15],
    },
    ingredients: ingredients
      .filter((i) => i[1] === id)
      .map((i) => ({
        product_id: i[2],
        quantity_g: Number(i[3]),
        is_optional: i[4] === "TRUE",
        order_index: Number(i[5]),
      })),
    steps: steps
      .filter((s) => s[1] === id)
      .map((s) => ({
        step_number: Number(s[2]),
        instruction: s[3],
        timer_sec: s[4] ? Number(s[4]) : null,
      })),
    cuisines: cuisines.filter((c) => c[0] === id).map((c) => Number(c[1])),
  });
}
