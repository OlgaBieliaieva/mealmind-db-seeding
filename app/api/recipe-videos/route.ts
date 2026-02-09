import { NextResponse } from "next/server";
import { RecipeVideoCreateSchema } from "@/types/recipe-video-create.dto";
import { mapRecipeVideoToRow } from "@/lib/mappers/recipeVideo.mapper";
import { appendRow } from "@/lib/sheets.helpers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = RecipeVideoCreateSchema.parse(body);

    const { recipeVideoId, row } = mapRecipeVideoToRow(input);

    await appendRow("recipe_videos", row);

    return NextResponse.json({
      ok: true,
      recipe_video_id: recipeVideoId,
    });
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
