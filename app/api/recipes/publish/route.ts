import { RecipePublishSchema } from "@/types/recipe-publish.dto";
import { findRecipeRow } from "@/lib/recipes.read";
import { updateSheetRow } from "@/lib/sheets.update";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipe_id } = RecipePublishSchema.parse(body);

    const found = await findRecipeRow(recipe_id);

    if (!found) {
      return Response.json(
        { success: false, error: "Recipe not found" },
        { status: 404 },
      );
    }

    const { rowIndex, row } = found;

    const now = new Date().toISOString();

    // оновлюємо статус і published_at
    const updatedRow = [...row];
    updatedRow[7] = "published"; // status
    updatedRow[11] = now; // updated_at
    updatedRow[12] = now; // published_at

    await updateSheetRow(`recipes!A${rowIndex}:Z${rowIndex}`, updatedRow);

    return Response.json({
      success: true,
      recipe_id,
      status: "published",
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return Response.json(
      { success: false, error: "Unknown error" },
      { status: 400 },
    );
  }
}
