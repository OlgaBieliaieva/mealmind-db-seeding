import { NextResponse, NextRequest } from "next/server";
import { deleteRowsRecipeId } from "@/lib/sheets.helpers";

export async function POST(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  await Promise.all([
    deleteRowsRecipeId("recipe_ingredients", id, 1),
    deleteRowsRecipeId("recipe_steps", id, 1),
    deleteRowsRecipeId("recipe_cuisines", id, 0),
    deleteRowsRecipeId("recipe_dietary_tags", id, 0),
    deleteRowsRecipeId("recipe_videos", id, 1),
  ]);

  return NextResponse.json({ ok: true });
}
