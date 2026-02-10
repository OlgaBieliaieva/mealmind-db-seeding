import { NextResponse } from "next/server";
import { RecipeAuthorCreateSchema } from "@/types/recipe-author-create.dto";
import { mapRecipeAuthorToRow } from "@/lib/mappers/recipeAuthor.mapper";
import { appendRow } from "@/lib/sheets.helpers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = RecipeAuthorCreateSchema.parse(body);

    const { row, author } = mapRecipeAuthorToRow(input);

    await appendRow("recipes_authors", row);

    return NextResponse.json({
      ok: true,
      author,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
