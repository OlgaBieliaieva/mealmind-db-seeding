import { z } from "zod";
import { readSheet } from "@/lib/sheets.read";
import { RecipeVideo } from "@/types/recipe-video";

const PlatformSchema = z.enum(["youtube", "instagram", "tiktok"]);

export async function getRecipeVideos(
  recipeId: string,
): Promise<RecipeVideo[]> {
  const rows = await readSheet("recipe_videos!A2:F");

  return rows
    .filter((r) => r[1] === recipeId)
    .map((r) => ({
      recipe_video_id: r[0],
      recipe_id: r[1],
      recipe_author_id: r[2] || null,
      platform: PlatformSchema.parse(r[3]),
      url: r[4],
      created_at: r[5],
    }));
}
