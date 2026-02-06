import { NextRequest } from "next/server";
import { readSheet } from "@/lib/sheets.read";
import { z } from "zod";

const ParamsSchema = z.object({
  id: z.string().uuid(),
});

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  // 🔑 IMPORTANT: unwrap async params
  const rawParams = await context.params;
  const { id } = ParamsSchema.parse(rawParams);

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
      recipe_type_id: recipe[3] ? Number(recipe[3]) : null,
      author_type: recipe[4] ?? null,
      visibility: recipe[6],
      status: recipe[8],
      base_servings: Number(recipe[9] || 0),
      base_output_weight_g: Number(recipe[10] || 0),
      prep_time_min: recipe[12] ? Number(recipe[12]) : null,
      cook_time_min: recipe[13] ? Number(recipe[13]) : null,
      difficulty: recipe[14] ?? null,
      photo_url: recipe[15] || null,
    },

    ingredients: ingredients
      .filter((i) => i[1] === id)
      .map((i) => ({
        product_id: i[2],
        quantity_g: Number(i[3] || 0),
        is_optional: i[4] === "TRUE",
        order_index: Number(i[5] || 0),
      }))
      .sort((a, b) => a.order_index - b.order_index),

    steps: steps
      .filter((s) => s[1] === id)
      .map((s) => ({
        step_number: Number(s[2]),
        instruction: s[3],
        timer_sec: s[4] ? Number(s[4]) : null,
      }))
      .sort((a, b) => a.step_number - b.step_number),

    cuisines: cuisines.filter((c) => c[0] === id).map((c) => Number(c[1])),
  });
}
