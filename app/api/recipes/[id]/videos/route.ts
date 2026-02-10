import { NextRequest } from "next/server";
import { z } from "zod";
import { readSheet } from "@/lib/sheets.read";
import { RecipeVideo } from "@/types/recipe-video";

const ParamsSchema = z.object({
  id: z.string().uuid(),
});

const PlatformSchema = z.enum(["youtube", "instagram", "tiktok"]);

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const rawParams = await context.params;
  const { id: recipeId } = ParamsSchema.parse(rawParams);

  const rows = await readSheet("recipe_videos!A2:F");

  const items: RecipeVideo[] = rows
    .filter((r) => r[1] === recipeId)
    .map((r) => ({
      recipe_video_id: r[0],
      recipe_id: r[1],
      recipe_author_id: r[2] || null,
      platform: PlatformSchema.parse(r[3]),
      url: r[4],
      created_at: r[5],
    }));

  return Response.json({ items });
}
