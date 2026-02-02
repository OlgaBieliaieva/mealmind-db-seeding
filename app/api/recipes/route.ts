import { NextResponse } from "next/server";
import { RecipeDraftSchema } from "@/types/recipe-create.dto";
import { mapRecipeDraftToRow } from "@/lib/mappers/recipe.mapper";
import { appendRow } from "@/lib/sheets.helpers";
import { findRecipeRow } from "@/lib/recipes.read";
import { updateSheetRow } from "@/lib/sheets.update";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = RecipeDraftSchema.parse(body);

    // Якщо recipe_id є → UPDATE
    if (input.recipe_id) {
      const found = await findRecipeRow(input.recipe_id);

      if (!found) {
        return NextResponse.json(
          { ok: false, error: "Recipe not found" },
          { status: 404 },
        );
      }

      const { rowIndex, row } = found;
      const { row: updatedRow } = mapRecipeDraftToRow(input);

      // зберігаємо created_at, published_at
      updatedRow[10] = row[10]; // created_at
      updatedRow[12] = row[12]; // published_at

      await updateSheetRow(`recipes!A${rowIndex}:M${rowIndex}`, updatedRow);

      return NextResponse.json({
        ok: true,
        recipe_id: input.recipe_id,
        status: "draft",
      });
    }

    // Якщо recipe_id нема → CREATE
    const { recipeId, row } = mapRecipeDraftToRow(input);

    await appendRow("recipes", row);

    return NextResponse.json({
      ok: true,
      recipe_id: recipeId,
      status: "draft",
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "Unknown error" },
      { status: 400 },
    );
  }
}
