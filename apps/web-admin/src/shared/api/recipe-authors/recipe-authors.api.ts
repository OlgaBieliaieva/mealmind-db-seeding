import { apiFetch } from "@/shared/lib/api/api";
import {
  CreateRecipeAuthorInput,
  CreateRecipeAuthorResponse,
  RecipeAuthorDto,
} from "../../domain/recipe-authors/recipe-authors.types";

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
