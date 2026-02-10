import { NextResponse } from "next/server";
import { readSheet } from "@/lib/sheets.read";
import { appendRow } from "@/lib/sheets.helpers";
import { RecipeAuthorCreateSchema } from "@/types/recipe-author-create.dto";
import { mapRecipeAuthorToRow } from "@/lib/mappers/recipeAuthor.mapper";

export async function GET() {
  const rows = await readSheet("recipes_authors!A2:Z");

  const items = rows.map((r) => ({
    recipe_author_id: r[0],
    type: r[1],
    display_name: r[2],
    avatar_url: r[3] || null,
    profile_url: r[4] || null,
    created_at: r[5],
  }));

  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = RecipeAuthorCreateSchema.parse(body);

    const { row } = mapRecipeAuthorToRow(input);

    await appendRow("recipes_authors", row);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
