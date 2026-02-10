import { generateUUID } from "@/lib/uuid";

type Input = {
  recipe_id: string;
  platform: "youtube" | "instagram" | "tiktok";
  url: string;
  recipe_author_id: string | null;
};

export function mapRecipeVideoToRow(input: Input) {
  return [
    generateUUID(), // recipe_video_id
    input.recipe_id,
    input.recipe_author_id ?? "",
    input.platform,
    input.url,
    new Date().toISOString(),
  ];
}
