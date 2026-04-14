import { apiFetch } from "@/shared/lib/api/api";

export type RecipeAuthorDto = {
  id: string;
  type: "user" | "blogger" | "system";
  display_name: string;
  avatar_url?: string | null;
  profile_url?: string | null;
};

export type CreateRecipeAuthorInput = {
  display_name: string;
  type: "user" | "blogger" | "system";
};

export type CreateRecipeAuthorResponse = {
  id: string;
  display_name: string;
};

export function getRecipeAuthors(): Promise<RecipeAuthorDto[]> {
  return apiFetch("/recipe-authors");
}

export function createRecipeAuthor(
  data: CreateRecipeAuthorInput,
): Promise<CreateRecipeAuthorResponse> {
  return apiFetch("/recipe-authors", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
