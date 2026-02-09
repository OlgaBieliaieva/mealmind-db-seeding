import { generateUUID } from "../uuid";

type Input = {
  recipe_id: string;
  platform: "youtube" | "instagram" | "tiktok";
  url: string;
  author_name?: string | null;
  author_url?: string | null;
};

export function mapRecipeVideoToRow(input: Input) {
  const recipeVideoId = generateUUID();

  return {
    recipeVideoId,
    row: [
      recipeVideoId,
      input.recipe_id,
      input.platform,
      input.url,
      input.author_name ?? "",
      input.author_url ?? "",
      new Date().toISOString(),
    ],
  };
}
