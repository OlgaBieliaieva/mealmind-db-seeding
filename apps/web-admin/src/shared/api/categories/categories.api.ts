import { apiFetch } from "@/shared/lib/api/api";
import { Category } from "@/shared/domain/category/category.types";

export function getCategories(): Promise<Category[]> {
  return apiFetch("/categories");
}
