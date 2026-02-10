import { z } from "zod";
import { readSheet } from "@/lib/sheets.read";
import { RecipeVideoView } from "@/types/recipe-views";

const PlatformSchema = z.enum(["youtube", "instagram", "tiktok"]);

export async function getRecipeVideos(
  recipeId: string,
): Promise<RecipeVideoView[]> {
  const rows = await readSheet("recipe_videos!A2:F");
  const authorRows = await readSheet("recipes_authors!A2:F");

  const authorsMap = Object.fromEntries(
    authorRows.map((r) => [
      r[0],
      {
        recipe_author_id: r[0],
        display_name: r[2],
        profile_url: r[4] || null,
      },
    ]),
  );

  return rows
    .filter((r) => r[1] === recipeId)
    .map((r) => {
      const authorId = r[2] || null;

      return {
        recipe_video_id: r[0],
        recipe_id: r[1],
        platform: PlatformSchema.parse(r[3]),
        url: r[4],
        created_at: r[5],
        author: authorId ? (authorsMap[authorId] ?? null) : null,
      };
    });
}
