import { NextRequest } from "next/server";
import { z } from "zod";
import { readSheet } from "@/lib/sheets.read";
import { RecipeVideo } from "@/types/recipe-video";

const ParamsSchema = z.object({
  id: z.string().uuid(),
});

const RecipeVideoPlatformSchema = z.enum(["youtube", "instagram", "tiktok"]);

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const rawParams = await context.params;
  const { id: recipeId } = ParamsSchema.parse(rawParams);

  const rows = await readSheet("recipe_videos!A2:G");

  const items: RecipeVideo[] = rows
    .filter((r) => r[1] === recipeId)
    .map((r) => ({
      recipe_video_id: r[0],
      recipe_id: r[1],
      platform: RecipeVideoPlatformSchema.parse(r[2]),
      url: r[3],
      author_name: r[4] || null,
      author_url: r[5] || null,
      created_at: r[6],
    }));

  return Response.json({ items });
}
